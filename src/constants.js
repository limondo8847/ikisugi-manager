const DEFAULT_ADMIN_IDS = ['1314112694835482710'];
const BOT_ADMIN_ID = DEFAULT_ADMIN_IDS[0];

const JOBS = {
    'アルバイト': { salaryMin: 50, salaryMax: 100, cost: 0, multiplier: 1.0 },
    '会社員': { salaryMin: 75, salaryMax: 150, cost: 2000, multiplier: 1.5 },
    'プログラマー': { salaryMin: 100, salaryMax: 200, cost: 5000, multiplier: 2.0 },
    'システムエンジニア': { salaryMin: 150, salaryMax: 300, cost: 12000, multiplier: 3.0 },
    '社長': { salaryMin: 250, salaryMax: 500, cost: 35000, multiplier: 5.0 }
};

const INMU_COOLDOWN_MS = 60 * 1000; // 語録検知のクールダウン（60秒）

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
    INMU_COOLDOWN_MS,
    DEFAULT_MARKET,
    SPLIT_THRESHOLD,
    SPLIT_FACTOR
};
