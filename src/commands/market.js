const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData } = require('../dataStore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('株式や仮想通貨の最新市場価格を表示します'),
    async execute(interaction, client) {
        const data = getData();
        const embed = new EmbedBuilder()
            .setTitle('投資市場相場 (IP Market)')
            .setDescription('株式・仮想通貨の現在の1単位あたりの価格です。（5分ごとに変動）')
            .setColor('Gold')
            .setTimestamp();

        let stockText = '';
        for (const [name, price] of Object.entries(data.market.stocks)) {
            stockText += `**${name}**: ῑ${price} IP\n`;
        }
        embed.addFields({ name: '株式', value: stockText || '取扱なし', inline: true });

        let cryptoText = '';
        for (const [name, price] of Object.entries(data.market.crypto)) {
            cryptoText += `**${name}**: ῑ${price} IP\n`;
        }
        embed.addFields({ name: '仮想通貨', value: cryptoText || '取扱なし', inline: true });

        return interaction.reply({ embeds: [embed] });
    }
};
