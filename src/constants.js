const BOT_ADMIN_ID = '1314112694835482710';

const JOBS = {
    'アルバイト': { salaryMin: 20, salaryMax: 40, cost: 0 },
    '会社員': { salaryMin: 60, salaryMax: 100, cost: 2000 },
    'プログラマー': { salaryMin: 120, salaryMax: 180, cost: 5000 },
    'システムエンジニア': { salaryMin: 200, salaryMax: 300, cost: 12000 },
    '社長': { salaryMin: 500, salaryMax: 800, cost: 35000 }
};

const DEFAULT_MARKET = {
    stocks: { TASLA: 100, GUGLE: 300, NUBIA: 150 },
    crypto: { BTC: 5000, DOGE: 10, IKISUGI: 100 }
};

const SPLIT_THRESHOLD = 100000;
const SPLIT_FACTOR = 10;

module.exports = {
    BOT_ADMIN_ID,
    JOBS,
    DEFAULT_MARKET,
    SPLIT_THRESHOLD,
    SPLIT_FACTOR
};
