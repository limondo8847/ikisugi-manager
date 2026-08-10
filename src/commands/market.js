const { getData, saveData } = require('../dataStore');
const { SPLIT_THRESHOLD, SPLIT_FACTOR } = require('../constants');
const { announceSplit, sendActivityLog } = require('../utils/logger');

async function checkAndExecuteSplits(client) {
    const data = getData();
    let modified = false;
    const pendingAnnouncements = [];

    // 株式の分割
    for (const symbol in data.market.stocks) {
        const price = data.market.stocks[symbol];
        if (price >= SPLIT_THRESHOLD) {
            let splitsCount = 0;
            let tempPrice = price;
            while (tempPrice >= SPLIT_THRESHOLD) {
                tempPrice = Math.round(tempPrice / SPLIT_FACTOR);
                splitsCount++;
            }
            const totalFactor = Math.pow(SPLIT_FACTOR, splitsCount);

            data.market.stocks[symbol] = tempPrice;

            if (data.marketHistory.stocks[symbol]) {
                data.marketHistory.stocks[symbol] = data.marketHistory.stocks[symbol].map(p => Math.round(p / totalFactor));
            }

            for (const userId in data.assets) {
                if (data.assets[userId] && data.assets[userId].stocks && data.assets[userId].stocks[symbol] !== undefined) {
                    data.assets[userId].stocks[symbol] = Math.round(data.assets[userId].stocks[symbol] * totalFactor * 1000000) / 1000000;
                }
            }

            console.log(`【株式分割】${symbol} が ${splitsCount}回 分割されました。旧価格: ῑ${price} IP -> 新価格: ῑ${tempPrice} IP`);
            pendingAnnouncements.push({ type: 'stock', symbol, totalFactor, oldPrice: price, newPrice: tempPrice });
            modified = true;
        }
    }

    // 仮想通貨の分割
    for (const symbol in data.market.crypto) {
        const price = data.market.crypto[symbol];
        if (price >= SPLIT_THRESHOLD) {
            let splitsCount = 0;
            let tempPrice = price;
            while (tempPrice >= SPLIT_THRESHOLD) {
                tempPrice = Math.round(tempPrice / SPLIT_FACTOR);
                splitsCount++;
            }
            const totalFactor = Math.pow(SPLIT_FACTOR, splitsCount);

            data.market.crypto[symbol] = tempPrice;

            if (data.marketHistory.crypto[symbol]) {
                data.marketHistory.crypto[symbol] = data.marketHistory.crypto[symbol].map(p => Math.round(p / totalFactor));
            }

            for (const userId in data.assets) {
                if (data.assets[userId] && data.assets[userId].crypto && data.assets[userId].crypto[symbol] !== undefined) {
                    data.assets[userId].crypto[symbol] = Math.round(data.assets[userId].crypto[symbol] * totalFactor * 1000000) / 1000000;
                }
            }

            console.log(`【仮想通貨分割】${symbol} が ${splitsCount}回 分割されました。旧価格: ῑ${price} IP -> 新価格: ῑ${tempPrice} IP`);
            pendingAnnouncements.push({ type: 'crypto', symbol, totalFactor, oldPrice: price, newPrice: tempPrice });
            modified = true;
        }
    }

    if (modified) {
        saveData();
    }

    // データ保存完了後にアナウンスを非同期で送信
    for (const item of pendingAnnouncements) {
        await announceSplit(client, item.type, item.symbol, item.totalFactor, item.oldPrice, item.newPrice);
    }
}

function startMarketInterval(client) {
    setInterval(async () => {
        const data = getData();

        // 株の価格変動
        for (const stock in data.market.stocks) {
            const currentPrice = data.market.stocks[stock];
            const changePercent = (Math.random() * 35 - 15) / 100;
            let newPrice = Math.round(currentPrice * (1 + changePercent));
            // 株価は 0 になり得る（倒産判定のため）
            if (newPrice < 0) newPrice = 0;
            data.market.stocks[stock] = newPrice;

            if (!data.marketHistory.stocks[stock]) data.marketHistory.stocks[stock] = [];
            data.marketHistory.stocks[stock].push(newPrice);
            if (data.marketHistory.stocks[stock].length > 20) data.marketHistory.stocks[stock].shift();

            // 倒産判定: 株価が0になったら上場廃止（すべての保有株を消去）
            if (newPrice === 0) {
                console.log(`【倒産】${stock} の株価が 0 になったため倒産処理を実行します。`);

                // 会社メタ削除
                if (data.companies && data.companies[stock]) {
                    delete data.companies[stock];
                }

                // 市場データ削除
                if (data.market && data.market.stocks && data.market.stocks[stock] !== undefined) {
                    delete data.market.stocks[stock];
                }
                if (data.marketHistory && data.marketHistory.stocks && data.marketHistory.stocks[stock]) {
                    delete data.marketHistory.stocks[stock];
                }

                // 保有株を全て削除（評価は0となるため補償なし）
                if (data.assets) {
                    for (const uid of Object.keys(data.assets)) {
                        if (data.assets[uid].stocks && data.assets[uid].stocks[stock] !== undefined) {
                            delete data.assets[uid].stocks[stock];
                        }
                    }
                }

                saveData();

                // ログ送信
                await sendActivityLog(client, null, '倒産通知', `銘柄 **${stock}** が株価 0 に達したため倒産（上場廃止）しました。すべての保有株は消失します。`, 'Red', [
                    { name: '銘柄', value: stock, inline: true }
                ]);
            }
        }

        // 仮想通貨の価格変動
        for (const crypto in data.market.crypto) {
            const currentPrice = data.market.crypto[crypto];
            const changePercent = (Math.random() * 45 - 20) / 100;
            let newPrice = Math.round(currentPrice * (1 + changePercent));
            if (newPrice < 1) newPrice = 1;
            data.market.crypto[crypto] = newPrice;

            if (!data.marketHistory.crypto[crypto]) data.marketHistory.crypto[crypto] = [];
            data.marketHistory.crypto[crypto].push(newPrice);
            if (data.marketHistory.crypto[crypto].length > 20) data.marketHistory.crypto[crypto].shift();
        }

        saveData();
        console.log('【市場ニュース】価格が変動しました。', data.market);

        await checkAndExecuteSplits(client);
    }, 5 * 60 * 1000);
}

module.exports = {
    checkAndExecuteSplits,
    startMarketInterval
};
