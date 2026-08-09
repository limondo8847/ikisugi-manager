const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('コイントスにIPを賭けます（勝率50%、配当2倍）')
        .addIntegerOption(option =>
            option.setName('bet')
                .setDescription('賭けるIPの金額')
                .setRequired(true)
                .setMinValue(1))
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('表か裏か')
                .setRequired(true)
                .addChoices(
                    { name: '表 (Heads)', value: '表' },
                    { name: '裏 (Tails)', value: '裏' }
                )),
    async execute(interaction, client) {
        const bet = interaction.options.getInteger('bet');
        const choice = interaction.options.getString('choice');
        const userId = interaction.user.id;
        const data = getData();
        const balance = data.balances[userId] || 0;

        if (balance < bet) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('残高不足')
                .setDescription(`賭け金は **ῑ${bet} IP** ですが、現在の所持額は **ῑ${balance} IP** です。`)
                .setColor('Red')
                .setTimestamp();
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        await interaction.reply({ content: 'コインを空中に投げました... 翻るコインを見つめています...' });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const result = Math.random() < 0.5 ? '表' : '裏';
        const isWin = (choice === result);

        let color = '';
        let change = 0;

        if (isWin) {
            data.balances[userId] = balance + bet;
            color = 'Green';
            change = bet;
        } else {
            data.balances[userId] = balance - bet;
            color = 'Red';
            change = -bet;
        }

        saveData();
        await updatePanel(client);

        await sendActivityLog(
            client,
            interaction,
            'コイントスログ',
            `<@${userId}> がコイントスで ${bet} IP を賭け、**${isWin ? '勝利' : '敗北'}**しました。 (予想: ${choice} | 結果: ${result})`,
            color,
            [
                { name: '賭け金', value: `ῑ${bet} IP`, inline: true },
                { name: '損益', value: `${change >= 0 ? '+' : ''}ῑ${change} IP`, inline: true },
                { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            ]
        );

        const resultEmbed = new EmbedBuilder()
            .setTitle('コイントス結果')
            .setDescription(`コインの結果は **【${result}】** でした。`)
            .setColor(color)
            .addFields(
                { name: '判定', value: isWin ? '的中！' : 'ハズレ...', inline: true },
                { name: '賭け金', value: `ῑ${bet} IP`, inline: true },
                { name: '損益', value: `${change >= 0 ? '+' : ''}ῑ${change} IP`, inline: true },
                { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            )
            .setTimestamp();

        return interaction.editReply({ content: '', embeds: [resultEmbed] });
    }
};
