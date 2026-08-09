const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData } = require('../dataStore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chart')
        .setDescription('株式や仮想通貨の価格推移グラフを表示します')
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
                )),
    async execute(interaction, client) {
        const symbol = interaction.options.getString('symbol');
        const data = getData();

        let type = '';
        let currentPrice = 0;
        let history = [];

        if (data.market.stocks[symbol] !== undefined) {
            type = 'stocks';
            currentPrice = data.market.stocks[symbol];
            history = data.marketHistory.stocks[symbol] || [];
        } else if (data.market.crypto[symbol] !== undefined) {
            type = 'crypto';
            currentPrice = data.market.crypto[symbol];
            history = data.marketHistory.crypto[symbol] || [];
        }

        if (!type || history.length === 0) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('エラー')
                .setDescription('対象銘柄の履歴データが見つかりません。')
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        let rateText = '0.00%';
        let changeText = '±0 IP';
        if (history.length > 1) {
            const firstPrice = history[0];
            const change = currentPrice - firstPrice;
            const rate = (change / firstPrice) * 100;
            rateText = `${rate >= 0 ? '+' : ''}${rate.toFixed(2)}%`;
            changeText = `${change >= 0 ? '+' : ''}${change} IP`;
        }

        const chartConfig = {
            type: 'line',
            data: {
                labels: history.map((_, i) => `${i + 1}期`),
                datasets: [{
                    label: `${symbol} 価格推移`,
                    data: history,
                    borderColor: type === 'stocks' ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
                    backgroundColor: type === 'stocks' ? 'rgba(54, 162, 235, 0.1)' : 'rgba(255, 99, 132, 0.1)',
                    fill: true,
                    tension: 0.2,
                    pointRadius: 3
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `${symbol} チャート`
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        };

        const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}&w=600&h=300&bkg=white`;

        const embed = new EmbedBuilder()
            .setTitle(`${symbol} 価格推移チャート`)
            .setColor(type === 'stocks' ? 'Blue' : 'Red')
            .addFields(
                { name: '現在価格', value: `ῑ${currentPrice} IP`, inline: true },
                { name: '過去比較変動', value: `${changeText} (${rateText})`, inline: true },
                { name: 'データ期間', value: `過去 ${history.length} 期間`, inline: true }
            )
            .setImage(chartUrl)
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    }
};
