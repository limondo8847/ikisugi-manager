const { EmbedBuilder } = require('discord.js');
const InmuDetector = require('../../inmu-detector');
const { JOBS, INMU_COOLDOWN_MS } = require('../constants');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('./panel');
const { sendActivityLog } = require('../utils/logger');

const detector = new InmuDetector();

/**
 * メッセージから淫夢語録を検知し、コインを付与するハンドラー
 */
async function handleInmuMessage(message, client) {
    if (!message.guild || message.author.bot) return;
    if (!message.content) return;

    // 語録の検知
    const detected = detector.detect(message.content);
    if (!detected || detected.length === 0) return;

    const userId = message.author.id;
    const now = Date.now();
    const data = getData();

    // クールダウン判定（連投スパム防止）
    const lastRewardTime = data.lastInmuReward[userId] || 0;
    if (now - lastRewardTime < INMU_COOLDOWN_MS) {
        // クールダウン中はチャットを妨げないためスルー
        return;
    }

    const job = data.jobs[userId] || 'アルバイト';
    const jobInfo = JOBS[job] || JOBS['アルバイト'];

    // 報酬計算（職業ごとのレンジからランダム）
    const baseSalary = Math.floor(Math.random() * (jobInfo.salaryMax - jobInfo.salaryMin + 1)) + jobInfo.salaryMin;
    const isBonus = Math.random() < 0.1; // 10%でボーナス
    const rawSalary = isBonus ? Math.floor(baseSalary * 1.5) : baseSalary;
    const tax = Math.floor(rawSalary * 0.1); // 所得税 10%
    const actualSalary = rawSalary - tax;

    if (!data.balances[userId]) data.balances[userId] = 0;
    data.balances[userId] += actualSalary;
    data.governmentFunds = (data.governmentFunds || 0) - rawSalary + tax;
    data.lastInmuReward[userId] = now;

    saveData();
    await updatePanel(client);

    // 検知された語録の整理（最大3件まで表示）
    const phrases = [...new Set(detected.map(d => d.canonical || d.matched))];
    const phraseDisplay = phrases.slice(0, 3).map(p => `「${p}」`).join(' ');

    const logMsg = `<@${userId}> が語録 ${phraseDisplay} を発言し、**${job}** として ῑ${rawSalary} IP（税控除後 ῑ${actualSalary} IP）を獲得しました！${isBonus ? ' (大成功ボーナス適用)' : ''}`;

    await sendActivityLog(
        client,
        message,
        '語録検知ログ',
        logMsg,
        isBonus ? 'Gold' : 'Green',
        [
            { name: '発言者', value: `<@${userId}>`, inline: true },
            { name: '職業', value: `${job} (${jobInfo.multiplier}倍)`, inline: true },
            { name: '検知語録', value: phraseDisplay, inline: true },
            { name: '総支給額', value: `ῑ${rawSalary} IP${isBonus ? ' (ボーナス1.5倍)' : ''}`, inline: true },
            { name: '所得税 (10%)', value: `ῑ${tax} IP`, inline: true },
            { name: '手取り額', value: `ῑ${actualSalary} IP`, inline: true },
            { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
        ]
    );

    const embed = new EmbedBuilder()
        .setTitle(isBonus ? '★ 淫夢語録検知！ (ボーナス支給)' : '淫夢語録検知')
        .setDescription(`語録 ${phraseDisplay} を検知しました！\n政府資金から報酬が支給されました。`)
        .setColor(isBonus ? 'Gold' : 'Green')
        .addFields(
            { name: '職業ボーナス', value: `${job} (${jobInfo.multiplier}倍)`, inline: true },
            { name: '総支給額', value: `ῑ${rawSalary} IP${isBonus ? ' (1.5倍)' : ''}`, inline: true },
            { name: '所得税 (10%)', value: `ῑ${tax} IP`, inline: true },
            { name: '手取り額', value: `ῑ${actualSalary} IP`, inline: true },
            { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
        )
        .setTimestamp();

    try {
        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (error) {
        console.error('語録検知のリプライ送信に失敗しました:', error);
    }
}

module.exports = {
    handleInmuMessage
};
