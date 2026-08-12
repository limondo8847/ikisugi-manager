const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('株式や仮想通貨を売却します')
        .addStringOption(option =>
            option.setName('symbol')
                .setDescription('銘柄名')
                .setRequired(true)
                .addChoices(
                    { name: 'TELSA (株)', value: 'TELSA' },
                    { name: 'GIGOLE (株)', value: 'GIGOLE' },
                    { name: 'MVIDIA (株)', value: 'MVIDIA' },
                    { name: 'Ramune Coin (仮想通貨)', value: 'RMN' },
                    { name: 'Opabium (仮想通貨)', value: 'OPABI' },
                    { name: 'Ikisugi Coin (仮想通貨)', value: 'IKISUGI' }
                ))
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('売却数量 (allで全額売却、または数値指定)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('total_ip')
                .setDescription('受取総額 (allで全額売却、または数値指定)')
                .setRequired(false)),
    async execute(interaction, client) {
        const symbol = interaction.options.getString('symbol');
        const amountOption = interaction.options.getString('amount');
        const totalIpOption = interaction.options.getString('total_ip');
        const userId = interaction.user.id;

        if ((amountOption === null && totalIpOption === null) || (amountOption !== null && totalIpOption !== null)) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription('「売却数量 (amount)」か「受取総額 (total_ip)」のいずれか一方のみを指定してください。')
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const data = getData();
        let type = null;
        if (data.market.stocks[symbol] !== undefined) {
            type = 'stock';
        } else if (data.market.crypto[symbol] !== undefined) {
            type = 'crypto';
        }

        if (!type) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription('指定された銘柄が存在しません。')
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (!data.assets[userId] ||
            (type === 'stock' && (!data.assets[userId].stocks || !data.assets[userId].stocks[symbol])) ||
            (type === 'crypto' && (!data.assets[userId].crypto || !data.assets[userId].crypto[symbol]))) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription(`対象の銘柄 **${symbol}** を保有していません。`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const userAssets = type === 'stock' ? data.assets[userId].stocks : data.assets[userId].crypto;
        const ownedAmount = userAssets[symbol] || 0;

        const marketGroup = type === 'stock' ? data.market.stocks : data.market.crypto;
        const currentPrice = marketGroup[symbol];

        if (!currentPrice) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription('市場にこの銘柄の価格が存在しません。')
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        let amount = 0;

        if (amountOption !== null) {
            if (amountOption.toLowerCase() === 'all') {
                amount = ownedAmount;
            } else {
                const parsedAmount = parseFloat(amountOption);
                if (isNaN(parsedAmount) || parsedAmount < 0.000001) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('エラー')
                        .setDescription('売却数量 (amount) は `all` または 0.000001 以上の数値で指定してください。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = parsedAmount;
            }
        } else if (totalIpOption !== null) {
            if (totalIpOption.toLowerCase() === 'all') {
                amount = ownedAmount;
            } else {
                const parsedTotalIp = parseFloat(totalIpOption);
                if (isNaN(parsedTotalIp) || parsedTotalIp < 1) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('エラー')
                        .setDescription('受取総額 (total_ip) は `all` または 1 以上の数値で指定してください。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = Math.ceil((parsedTotalIp / currentPrice) * 1000000) / 1000000;
                if (amount > ownedAmount) {
                    amount = ownedAmount;
                }
            }
        }

        if (amount < 0.000001) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription(`指定された金額が少なすぎます。最小売却数量は **0.000001 単位** です。（現在のレートでは最低 **ῑ${Math.ceil(currentPrice * 0.000001)} IP** 必要です）`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (ownedAmount < amount) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('数量不足')
                .setDescription(`保有数量が足りません。現在保有している数量は **${parseFloat(ownedAmount.toFixed(6))} 単位** です。`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const grossEarn = Math.floor(currentPrice * amount);
        const tax = Math.floor(grossEarn * 0.05);
        const netEarn = grossEarn - tax;

        userAssets[symbol] = Math.round((ownedAmount - amount) * 1000000) / 1000000;

        if (userAssets[symbol] <= 0) {
            delete userAssets[symbol];
        }

        if (!data.balances[userId]) data.balances[userId] = 0;
        data.balances[userId] += netEarn;

        if (data.governmentFunds === undefined) data.governmentFunds = 100000;
        data.governmentFunds += tax;

        saveData();
        await updatePanel(client);

        await sendActivityLog(
            client,
            interaction,
            '資産売却ログ',
            `<@${userId}> が **${symbol}** (${type === 'stock' ? '株式' : '仮想通貨'}) を売却しました。`,
            'Orange',
            [
                { name: '銘柄', value: symbol, inline: true },
                { name: '数量', value: `${parseFloat(amount.toFixed(6))} 単位`, inline: true },
                { name: '売却総額', value: `ῑ${grossEarn} IP`, inline: true },
                { name: '取引税 (5%)', value: `ῑ${tax} IP`, inline: true },
                { name: '手取り受取額', value: `ῑ${netEarn} IP`, inline: true },
                { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            ]
        );

        const embed = new EmbedBuilder()
            .setTitle('資産売却完了')
            .setDescription('保有資産の売却が完了しました。')
            .setColor('Orange')
            .addFields(
                { name: '売却銘柄', value: `${symbol} (${type === 'stock' ? '株式' : '仮想通貨'})`, inline: true },
                { name: '売却数量', value: `${parseFloat(amount.toFixed(6))} 単位`, inline: true },
                { name: '売却総額', value: `ῑ${grossEarn} IP`, inline: true },
                { name: '取引税 (5%)', value: `ῑ${tax} IP`, inline: true },
                { name: '受取額 (税引後)', value: `ῑ${netEarn} IP`, inline: true },
                { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            )
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
};
