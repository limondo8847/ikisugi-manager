const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-company')
        .setDescription('新しい会社を作成し上場させます（株式）')
        .addStringOption(opt => opt.setName('symbol').setDescription('会社シンボル（例: ABC）').setRequired(true))
        .addStringOption(opt => opt.setName('display_name').setDescription('会社表示名').setRequired(true))
        .addNumberOption(opt => opt.setName('initial_price').setDescription('初期株価（整数）').setRequired(true))
        .addNumberOption(opt => opt.setName('initial_shares').setDescription('初期発行株数（省略時0）').setRequired(false)),
    async execute(interaction, client) {
        const symbolRaw = interaction.options.getString('symbol');
        const symbol = String(symbolRaw).toUpperCase().trim();
        const displayName = interaction.options.getString('display_name');
        let initialPrice = Math.max(1, Math.floor(interaction.options.getNumber('initial_price')));
        let initialShares = interaction.options.getNumber('initial_shares') || 0;
        initialShares = Math.max(0, Math.floor(initialShares));

        // シンプルなシンボルバリデーション
        if (!/^[A-Z0-9]{1,8}$/.test(symbol)) {
            const err = new EmbedBuilder().setTitle('エラー').setDescription('シンボルは英大文字と数字のみ、最大8文字で指定してください。').setColor('Red').setTimestamp();
            return interaction.reply({ embeds: [err], ephemeral: true });
        }

        const data = getData();

        data.market = data.market || { stocks: {}, crypto: {} };
        data.marketHistory = data.marketHistory || { stocks: {}, crypto: {} };
        data.companies = data.companies || {};

        if (data.market.stocks[symbol] !== undefined || data.companies[symbol]) {
            const err = new EmbedBuilder().setTitle('エラー').setDescription('指定したシンボルは既に存在します。別のシンボルを選んでください。').setColor('Red').setTimestamp();
            return interaction.reply({ embeds: [err], ephemeral: true });
        }

        data.market.stocks[symbol] = initialPrice;
        data.marketHistory.stocks[symbol] = [initialPrice];
        data.companies[symbol] = {
            name: displayName,
            totalShares: initialShares,
            creator: interaction.user.id,
            createdAt: new Date().toISOString()
        };

        // 初期株を作成者に割り当てる（もし initialShares > 0 なら）
        if (initialShares > 0) {
            data.assets = data.assets || {};
            if (!data.assets[interaction.user.id]) data.assets[interaction.user.id] = { stocks: {}, crypto: {} };
            data.assets[interaction.user.id].stocks = data.assets[interaction.user.id].stocks || {};
            data.assets[interaction.user.id].stocks[symbol] = (data.assets[interaction.user.id].stocks[symbol] || 0) + initialShares;
        }

        saveData();

        await sendActivityLog(client, interaction, '会社上場ログ', `<@${interaction.user.id}> が新会社 **${displayName} (${symbol})** を上場しました。`, 'Green', [
            { name: '初期株価', value: `ῑ${initialPrice} IP`, inline: true },
            { name: '初期発行株数', value: `${initialShares} 株`, inline: true }
        ]);

        const embed = new EmbedBuilder()
            .setTitle('会社上場完了')
            .setDescription(`${displayName} (${symbol}) を市場に上場しました。`)
            .setColor('Green')
            .addFields(
                { name: '銘柄', value: symbol, inline: true },
                { name: '表示名', value: displayName, inline: true },
                { name: '初期株価', value: `ῑ${initialPrice} IP`, inline: true },
                { name: '初期発行株数', value: `${initialShares} 株`, inline: true }
            )
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }
};
