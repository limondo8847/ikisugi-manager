const DEFAULT_ADMIN_IDS = ['1314112694835482710'];
const BOT_ADMIN_ID = DEFAULT_ADMIN_IDS[0];

const JOBS = {
    'アルバイト': { salaryMin: 50, salaryMax: 100, cost: 0 },
    '会社員': { salaryMin: 150, salaryMax: 250, cost: 2000 },
    'プログラマー': { salaryMin: 300, salaryMax: 500, cost: 5000 },
    'システムエンジニア': { salaryMin: 600, salaryMax: 1000, cost: 12000 },
    '社長': { salaryMin: 1500, salaryMax: 2500, cost: 35000 }
};

const DEFAULT_MARKET = {
    stocks: { TELSA: 100, GIGOLE: 300, MVIDIA: 150 },
    crypto: { RMN: 5000, OPABI: 10, IKISUGI: 100 }
};

const SPLIT_THRESHOLD = 100000;
const SPLIT_FACTOR = 10;

module.exports = {
    DEFAULT_ADMIN_IDS,
    BOT_ADMIN_ID,
    JOBS,
    DEFAULT_MARKET,
    SPLIT_THRESHOLD,
    SPLIT_FACTOR
};
