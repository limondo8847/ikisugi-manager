const { getData, saveData } = require('../dataStore');
const { SPLIT_THRESHOLD, SPLIT_FACTOR } = require('../constants');
const { announceSplit } = require('../utils/logger');

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
            let delta = Math.round(currentPrice * changePercent);
            // 低価格時の膠着防止（丸めて0になるのを防ぐ）
            if (delta === 0) {
                delta = Math.random() < 0.55 ? 1 : -1;
            }
            let newPrice = currentPrice + delta;
            if (newPrice < 1) newPrice = 1;
            data.market.stocks[stock] = newPrice;

            if (!data.marketHistory.stocks[stock]) data.marketHistory.stocks[stock] = [];
            data.marketHistory.stocks[stock].push(newPrice);
            if (data.marketHistory.stocks[stock].length > 20) data.marketHistory.stocks[stock].shift();
        }

        // 仮想通貨の価格変動（ハイボラティリティ・膠着防止）
        for (const crypto in data.market.crypto) {
            const currentPrice = data.market.crypto[crypto];
            let changePercent = (Math.random() * 45 - 20) / 100;

            // 5%の確率で急騰イベント、3%の確率で急落イベント
            const roll = Math.random();
            if (roll < 0.05) {
                changePercent = (Math.random() * 70 + 50) / 100; // +50% 〜 +120%
            } else if (roll < 0.08) {
                changePercent = -(Math.random() * 20 + 30) / 100; // -30% 〜 -50%
            }

            let delta = Math.round(currentPrice * changePercent);

            // 低価格帯（10 IP以下）の場合は固定値（±1〜3）を加味して2 IP等の膠着を完全に防止
            if (currentPrice <= 10) {
                const step = Math.floor(Math.random() * 3) + 1;
                delta = delta !== 0 ? delta : (Math.random() < 0.6 ? step : -step);
            } else if (delta === 0) {
                delta = Math.random() < 0.55 ? 1 : -1;
            }

            let newPrice = currentPrice + delta;
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
