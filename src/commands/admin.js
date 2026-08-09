const { SlashCommandBuilder, PermissionsBitField, ChannelType, EmbedBuilder } = require('discord.js');
const { getData, saveData, isAdmin } = require('../dataStore');
const { updatePanel, generateLeaderboardEmbed } = require('../services/panel');
const { sendLog } = require('../utils/logger');

function isBotAdmin(interaction) {
    return isAdmin(interaction.user.id);
}

function isServerAdmin(interaction) {
    if (isBotAdmin(interaction)) return true;
    if (interaction.member && interaction.member.permissions && interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return true;
    }
    return false;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('管理者専用コマンド群')
        .addSubcommand(subcommand =>
            subcommand
                .setName('pay')
                .setDescription('管理者権限でIPの送金・剥奪を行います (BOT管理者専用)')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('対象のユーザー')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option.setName('amount')
                        .setDescription('金額 (正の値で給付、負の値で剥奪)')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('setlog')
                .setDescription('IPのログを送信するチャンネルを設定します')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('ログ用テキストチャンネル')
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('board')
                .setDescription('IP残高パネルをこのチャンネルに作成します'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('BOT管理者を新規追加します (BOT管理者専用)')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('管理者に追加するユーザー')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('BOT管理者の登録を解除します (BOT管理者専用)')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('管理者から削除するユーザー')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('登録されているBOT管理者の一覧を表示します (BOT管理者専用)')),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        const data = getData();

        const botAdminOnlySubcommands = ['pay', 'add', 'remove', 'list'];
        if (botAdminOnlySubcommands.includes(subcommand)) {
            if (!isBotAdmin(interaction)) {
                return interaction.reply({ content: 'このコマンドはBOT管理者のみ使用できます。', ephemeral: true });
            }
        } else {
            if (!isServerAdmin(interaction)) {
                return interaction.reply({ content: 'このコマンドは管理者のみ使用できます。', ephemeral: true });
            }
        }

        if (subcommand === 'pay') {
            const targetUser = interaction.options.getUser('user');
            const amount = interaction.options.getInteger('amount');

            if (targetUser.bot) {
                return interaction.reply({ content: 'Botには送金できません。', ephemeral: true });
            }

            if (!data.balances[targetUser.id]) data.balances[targetUser.id] = 0;
            data.balances[targetUser.id] += amount;
            if (data.balances[targetUser.id] < 0) data.balances[targetUser.id] = 0;

            saveData();
            await updatePanel(client);
            await sendLog(client, interaction, targetUser, amount, true);

            const action = amount >= 0 ? '送金' : '剥奪';
            return interaction.reply(`管理者権限で<@${targetUser.id}>に ῑ${Math.abs(amount)}を${action}しました。\n現在の所持額: ῑ${data.balances[targetUser.id]}`);
        } else if (subcommand === 'setlog') {
            const channel = interaction.options.getChannel('channel');
            data.logChannelId = channel.id;
            saveData();
            return interaction.reply({ content: `ログチャンネルを ${channel} に設定しました。`, ephemeral: true });
        } else if (subcommand === 'board') {
            if (!interaction.guildId) {
                return interaction.reply({ content: 'このコマンドはサーバー内でのみ使用できます。', ephemeral: true });
            }

            await interaction.deferReply({ ephemeral: true });
            const embed = generateLeaderboardEmbed();
            const message = await interaction.channel.send({ embeds: [embed] });

            data.panels[interaction.guildId] = {
                messageId: message.id,
                channelId: message.channel.id
            };
            saveData();

            return interaction.editReply({ content: 'このチャンネルにIPパネルを作成しました。', ephemeral: true });
        } else if (subcommand === 'add') {
            const targetUser = interaction.options.getUser('user');
            if (targetUser.bot) {
                return interaction.reply({ content: 'Botを管理者として追加することはできません。', ephemeral: true });
            }
            if (data.adminIds.includes(targetUser.id)) {
                return interaction.reply({ content: `<@${targetUser.id}> は既に管理者として登録されています。`, ephemeral: true });
            }

            data.adminIds.push(targetUser.id);
            saveData();
            return interaction.reply({ content: `<@${targetUser.id}> をBOT管理者に追加しました。`, ephemeral: true });
        } else if (subcommand === 'remove') {
            const targetUser = interaction.options.getUser('user');
            if (!data.adminIds.includes(targetUser.id)) {
                return interaction.reply({ content: `<@${targetUser.id}> は管理者として登録されていません。`, ephemeral: true });
            }

            if (data.adminIds.length <= 1) {
                return interaction.reply({ content: '管理者が0人になってしまうため、削除できません。', ephemeral: true });
            }

            data.adminIds = data.adminIds.filter(id => id !== targetUser.id);
            saveData();
            return interaction.reply({ content: `<@${targetUser.id}> のBOT管理者権限を解除しました。`, ephemeral: true });
        } else if (subcommand === 'list') {
            const adminMentions = data.adminIds.map(id => `<@${id}> (\`${id}\`)`).join('\n');
            const embed = new EmbedBuilder()
                .setTitle('BOT管理者一覧')
                .setDescription(adminMentions || '登録されている管理者がいません。')
                .setColor('Blue')
                .setTimestamp();
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
};
