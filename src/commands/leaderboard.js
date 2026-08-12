const { SlashCommandBuilder } = require('discord.js');
const { generateLeaderboardEmbed } = require('../services/panel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('経済状況および所持金ランキングを表示します'),
    async execute(interaction, client) {
        const embed = generateLeaderboardEmbed();
        return interaction.reply({ embeds: [embed] });
    }
};
