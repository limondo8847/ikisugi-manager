const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { JOBS } = require('../constants');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('働いてIPを獲得します（30分のクールダウンがあります）'),
    async execute(interaction, client) {
        const userId = interaction.user.id;
        const now = Date.now();
        const data = getData();
        const lastWorkTime = data.lastWork[userId] || 0;
        const cooldown = 30 * 60 * 1000;

        if (now - lastWorkTime < cooldown) {
            const timeLeft = cooldown - (now - lastWorkTime);
            const minutes = Math.floor(timeLeft / (60 * 1000));
            const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
            const cooldownEmbed = new EmbedBuilder()
                .setTitle('クールダウン中')
                .setDescription(`労働のクールダウン中です。\nあと **${minutes}分${seconds}秒** お待ちください。`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
        }

        const job = data.jobs[userId] || 'アルバイト';
        const jobInfo = JOBS[job] || JOBS['アルバイト'];

        const baseSalary = Math.floor(Math.random() * (jobInfo.salaryMax - jobInfo.salaryMin + 1)) + jobInfo.salaryMin;
        const isBonus = Math.random() < 0.15;
        const rawSalary = isBonus ? Math.floor(baseSalary * 1.5) : baseSalary;
        const tax = Math.floor(rawSalary * 0.1);
        const actualSalary = rawSalary - tax;

        if (!data.balances[userId]) data.balances[userId] = 0;
        data.balances[userId] += actualSalary;
        data.governmentFunds = (data.governmentFunds || 0) - rawSalary + tax;
        data.lastWork[userId] = now;

        saveData();
        await updatePanel(client);

        const logMsg = isBonus
            ? `<@${userId}> が **${job}** として働き、**大成功ボーナス**を獲得！ῑ${rawSalary} IP（所得税10% ῑ${tax}控除、手取り ῑ${actualSalary} IP）を政府資金から獲得しました！`
            : `<@${userId}> が **${job}** として働き、ῑ${rawSalary} IP（所得税10% ῑ${tax}控除、手取り ῑ${actualSalary} IP）を政府資金から獲得しました！`;

        await sendActivityLog(
            client,
            interaction,
            '労働ログ',
            logMsg,
            isBonus ? 'Gold' : 'Green',
            [
                { name: '総支給額', value: `ῑ${rawSalary} IP${isBonus ? ' (ボーナス1.5倍)' : ''}`, inline: true },
                { name: '所得税', value: `ῑ${tax} IP`, inline: true },
                { name: '手取り額', value: `ῑ${actualSalary} IP`, inline: true },
                { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            ]
        );

        const embed = new EmbedBuilder()
            .setTitle(isBonus ? '★ 労働大成功！ (ボーナス支給)' : '労働完了')
            .setDescription(
                isBonus
                    ? `**${job}** としての仕事で素晴らしい成果をあげました！(給料1.5倍ボーナス適用)`
                    : `**${job}** としての仕事を完了しました。給料は政府資金から支払われました。`
            )
            .setColor(isBonus ? 'Gold' : 'Green')
            .addFields(
                { name: '総支給給料', value: `ῑ${rawSalary} IP${isBonus ? ' (1.5倍)' : ''}`, inline: true },
                { name: '所得税 (10%)', value: `ῑ${tax} IP`, inline: true },
                { name: '手取り額', value: `ῑ${actualSalary} IP`, inline: true },
                { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            )
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
};
