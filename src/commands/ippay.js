const { SlashCommandBuilder } = require('discord.js');
const { BOT_ADMIN_ID } = require('../constants');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ippay')
        .setDescription('IPを送金・剥奪します')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('金額')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('対象のユーザー')
                .setRequired(true)),
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('amount');
        const targetUser = interaction.options.getUser('user');
        const sender = interaction.user;

        if (targetUser.bot) {
            return interaction.reply({ content: 'Botには送金できません。', ephemeral: true });
        }

        if (targetUser.id === sender.id) {
            return interaction.reply({ content: '自分自身には送金できません。', ephemeral: true });
        }

        const data = getData();
        const isAdmin = sender.id === BOT_ADMIN_ID;

        if (isAdmin) {
            // 管理者処理: 無限送金 & 剥奪(負の値)
            if (!data.balances[targetUser.id]) data.balances[targetUser.id] = 0;
            data.balances[targetUser.id] += amount;

            if (data.balances[targetUser.id] < 0) data.balances[targetUser.id] = 0;

            saveData();
            await updatePanel(client);
            await sendLog(client, interaction, targetUser, amount, true);

            const action = amount > 0 ? '送金' : '剥奪';
            return interaction.reply(`管理者権限で<@${targetUser.id}>に ῑ${Math.abs(amount)}を${action}しました。\n現在の所持額: ῑ${data.balances[targetUser.id]}`);
        } else {
            // 一般ユーザー処理: 所持金からの送金
            if (amount <= 0) {
                return interaction.reply({ content: '送金額は1以上にしてください。', ephemeral: true });
            }

            if (!data.balances[sender.id]) data.balances[sender.id] = 0;
            if (!data.balances[targetUser.id]) data.balances[targetUser.id] = 0;

            if (data.balances[sender.id] < amount) {
                return interaction.reply({ content: `残高が不足しています。\nあなたの所持額: ῑ${data.balances[sender.id]}`, ephemeral: true });
            }

            // 10%の譲渡税（送金手数料）を計算
            const tax = Math.floor(amount * 0.1);
            const receiveAmount = amount - tax;

            data.balances[sender.id] -= amount;
            data.balances[targetUser.id] += receiveAmount;
            data.governmentFunds = (data.governmentFunds || 0) + tax;

            saveData();
            await updatePanel(client);
            await sendLog(client, interaction, targetUser, amount, false);

            return interaction.reply(`<@${sender.id}>が<@${targetUser.id}>にῑ${amount}を送金しました！ (うち10%のῑ${tax}が税金として政府資金に送られ、受取額はῑ${receiveAmount}になりました)\n<@${sender.id}>の残高: ῑ${data.balances[sender.id]}\n<@${targetUser.id}>の残高: ῑ${data.balances[targetUser.id]}`);
        }
    }
};
