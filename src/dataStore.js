const fs = require('fs');
const path = require('path');
const { DEFAULT_MARKET, DEFAULT_ADMIN_IDS } = require('./constants');

const DATA_FILE = path.join(__dirname, '../data.json');

let data = {
    balances: {},
    panels: {},
    logChannelId: null,
    lastWork: {},
    jobs: {},
    assets: {},
    market: JSON.parse(JSON.stringify(DEFAULT_MARKET)),
    governmentFunds: 100000,
    adminIds: [...DEFAULT_ADMIN_IDS]
};

function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        try {
            data = JSON.parse(raw);
        } catch (e) {
            console.error('データのパースに失敗しました。デフォルト値を使用します。', e);
        }

        if (!data.balances) data.balances = {};
        if (!data.panels) data.panels = {};

        // 旧バージョンのデータ移行処理
        if (data.panelChannelId && data.panelMessageId && Object.keys(data.panels).length === 0) {
            data.panels['legacy'] = {
                channelId: data.panelChannelId,
                messageId: data.panelMessageId
            };
        }
        delete data.panelChannelId;
        delete data.panelMessageId;

        if (!data.logChannelId) data.logChannelId = null;
        if (!data.lastWork) data.lastWork = {};
        if (!data.jobs) data.jobs = {};
        if (!data.assets) data.assets = {};
        if (data.governmentFunds === undefined) data.governmentFunds = 100000;
        if (!data.adminIds || !Array.isArray(data.adminIds) || data.adminIds.length === 0) {
            data.adminIds = [...DEFAULT_ADMIN_IDS];
        }
        if (!data.market) data.market = JSON.parse(JSON.stringify(DEFAULT_MARKET));
        if (!data.market.stocks) data.market.stocks = JSON.parse(JSON.stringify(DEFAULT_MARKET.stocks));
        if (!data.market.crypto) data.market.crypto = JSON.parse(JSON.stringify(DEFAULT_MARKET.crypto));
        if (!data.marketHistory) data.marketHistory = { stocks: {}, crypto: {} };
        if (!data.marketHistory.stocks) data.marketHistory.stocks = {};
        if (!data.marketHistory.crypto) data.marketHistory.crypto = {};

        const defaultHistoryLen = 10;
        for (const symbol in data.market.stocks) {
            if (!data.marketHistory.stocks[symbol] || data.marketHistory.stocks[symbol].length === 0) {
                data.marketHistory.stocks[symbol] = Array(defaultHistoryLen).fill(data.market.stocks[symbol]);
            }
        }
        for (const symbol in data.market.crypto) {
            if (!data.marketHistory.crypto[symbol] || data.marketHistory.crypto[symbol].length === 0) {
                data.marketHistory.crypto[symbol] = Array(defaultHistoryLen).fill(data.market.crypto[symbol]);
            }
        }
    }
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function isAdmin(userId) {
    if (!userId) return false;
    return Array.isArray(data.adminIds) && data.adminIds.includes(userId);
}

loadData();

module.exports = {
    getData: () => data,
    loadData,
    saveData,
    isAdmin
};
