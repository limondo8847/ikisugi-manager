const { SlashCommandBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ippay')
        .setDescription('IPを送金します')
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

        if (amount <= 0) {
            return interaction.reply({ content: '送金額は1以上にしてください。', ephemeral: true });
        }

        const data = getData();

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
};
