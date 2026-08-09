const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('株式や仮想通貨を購入します')
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
                .setDescription('購入数量 (allで全額購入、または数値指定)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('total_ip')
                .setDescription('支払総額 (allで全額購入、または数値指定)')
                .setRequired(false)),
    async execute(interaction, client) {
        const symbol = interaction.options.getString('symbol');
        const amountOption = interaction.options.getString('amount');
        const totalIpOption = interaction.options.getString('total_ip');
        const userId = interaction.user.id;

        if ((amountOption === null && totalIpOption === null) || (amountOption !== null && totalIpOption !== null)) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription('「購入数量 (amount)」か「支払総額 (total_ip)」のいずれか一方のみを指定してください。')
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

        const marketGroup = type === 'stock' ? data.market.stocks : data.market.crypto;
        const currentPrice = marketGroup[symbol];
        const balance = data.balances[userId] || 0;
        let amount = 0;
        let totalCost = 0;

        if (amountOption !== null) {
            if (amountOption.toLowerCase() === 'all') {
                if (balance <= 0) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('残高不足')
                        .setDescription('所持金（IP）がないため、全額購入を実行できません。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = Math.floor((balance / currentPrice) * 1000000) / 1000000;
                totalCost = Math.ceil(currentPrice * amount);
            } else {
                const parsedAmount = parseFloat(amountOption);
                if (isNaN(parsedAmount) || parsedAmount < 0.000001) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('エラー')
                        .setDescription('購入数量 (amount) は `all` または 0.000001 以上の数値で指定してください。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = parsedAmount;
                totalCost = Math.ceil(currentPrice * amount);
            }
        } else if (totalIpOption !== null) {
            if (totalIpOption.toLowerCase() === 'all') {
                if (balance <= 0) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('残高不足')
                        .setDescription('所持金（IP）がないため、全額購入を実行できません。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = Math.floor((balance / currentPrice) * 1000000) / 1000000;
                totalCost = Math.ceil(currentPrice * amount);
            } else {
                const parsedTotalIp = parseFloat(totalIpOption);
                if (isNaN(parsedTotalIp) || parsedTotalIp < 1) {
                    const errorEmbed = new EmbedBuilder()
                        .setTitle('エラー')
                        .setDescription('支払総額 (total_ip) は `all` または 1 以上の数値で指定してください。')
                        .setColor('Red')
                        .setTimestamp();
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
                amount = Math.floor((parsedTotalIp / currentPrice) * 1000000) / 1000000;
                totalCost = Math.ceil(currentPrice * amount);
            }
        }

        if (amount < 0.000001) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription(`指定された金額が少なすぎます。最小購入数量は **0.000001 単位** です。（現在のレートでは最低 **ῑ${Math.ceil(currentPrice * 0.000001)} IP** 必要です）`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (balance < totalCost) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('残高不足')
                .setDescription(`購入費用は **ῑ${totalCost} IP** （単価 ῑ${currentPrice} * 数量 ${parseFloat(amount.toFixed(6))}）ですが、現在の所持額は **ῑ${balance} IP** です。`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        data.balances[userId] = balance - totalCost;

        if (!data.assets[userId]) data.assets[userId] = { stocks: {}, crypto: {} };
        if (!data.assets[userId].stocks) data.assets[userId].stocks = {};
        if (!data.assets[userId].crypto) data.assets[userId].crypto = {};

        const userAssets = type === 'stock' ? data.assets[userId].stocks : data.assets[userId].crypto;
        userAssets[symbol] = Math.round(((userAssets[symbol] || 0) + amount) * 1000000) / 1000000;

        saveData();
        await updatePanel(client);

        await sendActivityLog(
            client,
            interaction,
            '資産購入ログ',
            `<@${userId}> が **${symbol}** (${type === 'stock' ? '株式' : '仮想通貨'}) を購入しました。`,
            'Green',
            [
                { name: '銘柄', value: symbol, inline: true },
                { name: '数量', value: `${parseFloat(amount.toFixed(6))} 単位`, inline: true },
                { name: '購入総額', value: `ῑ${totalCost} IP`, inline: true },
                { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            ]
        );

        const embed = new EmbedBuilder()
            .setTitle('資産購入完了')
            .setDescription('指定した資産の購入が完了しました。')
            .setColor('Green')
            .addFields(
                { name: '購入銘柄', value: `${symbol} (${type === 'stock' ? '株式' : '仮想通貨'})`, inline: true },
                { name: '購入数量', value: `${parseFloat(amount.toFixed(6))} 単位`, inline: true },
                { name: '支払総額', value: `ῑ${totalCost} IP`, inline: true },
                { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            )
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
};
