const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData } = require('../dataStore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('portfolio')
        .setDescription('自分の資産状況（所持金・保有株・保有仮想通貨）を確認します'),
    async execute(interaction, client) {
        const userId = interaction.user.id;
        const data = getData();
        const balance = data.balances[userId] || 0;

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} のポートフォリオ`)
            .setColor('DarkGreen')
            .setTimestamp();

        let stockText = '';
        let stockValuation = 0;
        const userStocks = (data.assets[userId] && data.assets[userId].stocks) ? data.assets[userId].stocks : {};
        for (const [symbol, amount] of Object.entries(userStocks)) {
            const price = data.market.stocks[symbol] || 0;
            const valuation = Math.floor(price * amount);
            stockValuation += valuation;
            stockText += `**${symbol}**: ${parseFloat(amount.toFixed(6))} 単位 (評価額: ῑ${valuation} IP)\n`;
        }
        embed.addFields({ name: '保有株式', value: stockText || '保有なし', inline: false });

        let cryptoText = '';
        let cryptoValuation = 0;
        const userCrypto = (data.assets[userId] && data.assets[userId].crypto) ? data.assets[userId].crypto : {};
        for (const [symbol, amount] of Object.entries(userCrypto)) {
            const price = data.market.crypto[symbol] || 0;
            const valuation = Math.floor(price * amount);
            cryptoValuation += valuation;
            cryptoText += `**${symbol}**: ${parseFloat(amount.toFixed(6))} 単位 (評価額: ῑ${valuation} IP)\n`;
        }
        embed.addFields({ name: '保有仮想通貨', value: cryptoText || '保有なし', inline: false });

        const totalValuation = balance + stockValuation + cryptoValuation;
        embed.addFields(
            { name: '現金残高', value: `ῑ${balance} IP`, inline: true },
            { name: '総資産評価額', value: `ῑ${totalValuation} IP`, inline: true }
        );

        return interaction.reply({ embeds: [embed] });
    }
};
