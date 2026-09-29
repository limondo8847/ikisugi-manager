const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { JOBS } = require('../constants');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('job')
        .setDescription('職業の確認や転職を行います')
        .addSubcommand(subcommand =>
            subcommand.setName('list')
                .setDescription('転職可能な職業一覧と転職費用を表示します'))
        .addSubcommand(subcommand =>
            subcommand.setName('change')
                .setDescription('指定した職業に転職します')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('転職先の職業名')
                        .setRequired(true)
                        .addChoices(
                            { name: '会社員 (費用: 2,000 IP)', value: '会社員' },
                            { name: 'プログラマー (費用: 5,000 IP)', value: 'プログラマー' },
                            { name: 'システムエンジニア (費用: 12,000 IP)', value: 'システムエンジニア' },
                            { name: '社長 (費用: 35,000 IP)', value: '社長' }
                        ))),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        const userId = interaction.user.id;
        const data = getData();

        if (subcommand === 'list') {
            const currentJob = data.jobs[userId] || 'アルバイト';
            const embed = new EmbedBuilder()
                .setTitle('職業リスト & 転職案内')
                .setDescription(`現在のあなたの職業: **${currentJob}**\n語録発言時の獲得コインに職業ボーナス倍率が適用されます。\n\n転職したい場合は \`/job change [職業名]\` を実行してください。`)
                .setColor('Blue')
                .setTimestamp();

            for (const [name, info] of Object.entries(JOBS)) {
                embed.addFields({
                    name: `${name} ${name === currentJob ? '(現在)' : ''}`,
                    value: `語録報酬: ῑ${info.salaryMin} 〜 ῑ${info.salaryMax} IP (ボーナス: ${info.multiplier}倍)\n転職費用: ${info.cost === 0 ? '無料' : `ῑ${info.cost} IP`}`,
                    inline: false
                });
            }

            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'change') {
            const newJob = interaction.options.getString('name');
            const currentJob = data.jobs[userId] || 'アルバイト';

            if (newJob === currentJob) {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('エラー')
                    .setDescription(`既に **${newJob}** に就いています。`)
                    .setColor('Red')
                    .setTimestamp();
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }

            const jobInfo = JOBS[newJob];
            if (!jobInfo) {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('エラー')
                    .setDescription('指定された職業は存在しません。')
                    .setColor('Red')
                    .setTimestamp();
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }

            const cost = jobInfo.cost;
            const currentBalance = data.balances[userId] || 0;

            if (currentBalance < cost) {
                const errorEmbed = new EmbedBuilder()
                    .setTitle('残高不足')
                    .setDescription(`転職には **ῑ${cost} IP** 必要ですが、現在の所持額は **ῑ${currentBalance} IP** です。`)
                    .setColor('Red')
                    .setTimestamp();
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }

            data.balances[userId] = currentBalance - cost;
            data.jobs[userId] = newJob;

            saveData();
            await updatePanel(client);

            await sendActivityLog(
                client,
                interaction,
                '転職ログ',
                `<@${userId}> が **${currentJob}** から **${newJob}** へ転職しました。`,
                'Purple',
                [
                    { name: '消費額', value: `ῑ${cost} IP`, inline: true },
                    { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
                ]
            );

            const embed = new EmbedBuilder()
                .setTitle('転職成功')
                .setDescription('新しい職業への転職手続きが完了しました。')
                .setColor('Purple')
                .addFields(
                    { name: '以前の職業', value: currentJob, inline: true },
                    { name: '新しい職業', value: newJob, inline: true },
                    { name: '転職費用', value: `ῑ${cost} IP`, inline: true },
                    { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
                )
                .setTimestamp();
            return interaction.reply({ embeds: [embed] });
        }
    }
};
