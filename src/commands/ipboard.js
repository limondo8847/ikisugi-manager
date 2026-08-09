const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { generateLeaderboardEmbed } = require('../services/panel');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ipboard')
        .setDescription('IP残高を確認するパネルをこのチャンネルに作成します (Admin only)'),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'このコマンドは管理者のみ使用できます。', ephemeral: true });
        }

        if (!interaction.guildId) {
            return interaction.reply({ content: 'このコマンドはサーバー内でのみ使用できます。', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        const embed = generateLeaderboardEmbed();
        const message = await interaction.channel.send({ embeds: [embed] });

        const data = getData();
        data.panels[interaction.guildId] = {
            messageId: message.id,
            channelId: message.channel.id
        };
        saveData();

        await interaction.editReply({ content: 'このチャンネルにIPパネルを作成しました。', ephemeral: true });
    }
};
