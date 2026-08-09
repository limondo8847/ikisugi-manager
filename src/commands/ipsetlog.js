const { SlashCommandBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const { getData, saveData } = require('../dataStore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ipsetlog')
        .setDescription('IPの送金・剥奪ログを送信するチャンネルを設定します (Admin only)')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('ログを送信するテキストチャンネル')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)),
    async execute(interaction, client) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'このコマンドは管理者のみ使用できます。', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel');
        const data = getData();
        data.logChannelId = channel.id;
        saveData();

        return interaction.reply({ content: `ログチャンネルを ${channel} に設定しました。`, ephemeral: true });
    }
};
