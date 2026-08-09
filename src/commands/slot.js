const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slot')
        .setDescription('スロットにIPを賭けます（3つ揃い:3〜5倍、2つ揃い:1.5倍）')
        .addIntegerOption(option =>
            option.setName('bet')
                .setDescription('賭けるIPの金額')
                .setRequired(true)
                .setMinValue(1)),
    async execute(interaction, client) {
        const bet = interaction.options.getInteger('bet');
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

        await interaction.reply({ content: '🎰 スロットを回しています...\n[ 🎰 | 🎰 | 🎰 ]' });

        const slotSymbols = ['🍒', '🍋', '🍉', '💎', '7️⃣'];

        const result1 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        const result2 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        const result3 = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

        await new Promise(resolve => setTimeout(resolve, 800));
        await interaction.editReply({ content: `🎰 スロットを回しています...\n[ ${result1} | 🎰 | 🎰 ]` });

        await new Promise(resolve => setTimeout(resolve, 800));
        await interaction.editReply({ content: `🎰 スロットを回しています...\n[ ${result1} | ${result2} | 🎰 ]` });

        await new Promise(resolve => setTimeout(resolve, 800));

        let multiplier = 0;
        let outcomeMessage = '';
        let color = '';

        if (result1 === result2 && result2 === result3) {
            if (result1 === '7️⃣') {
                multiplier = 5;
            } else if (result1 === '💎') {
                multiplier = 4;
            } else {
                multiplier = 3;
            }
            outcomeMessage = `見事に 3つの **${result1}** が揃いました！ **${multiplier}倍** の配当です！`;
            color = 'Green';
        } else if (result1 === result2 || result2 === result3 || result1 === result3) {
            multiplier = 1.5;
            const matchSymbol = (result1 === result2 || result1 === result3) ? result1 : result2;
            outcomeMessage = `**${matchSymbol}** が 2つ揃いました！ **1.5倍** の配当です！`;
            color = 'Blue';
        } else {
            multiplier = 0;
            outcomeMessage = '揃いませんでした...。賭け金は没収されます。';
            color = 'Red';
        }

        const profit = Math.floor(bet * multiplier) - bet;
        data.balances[userId] = balance + profit;

        saveData();
        await updatePanel(client);

        await sendActivityLog(
            client,
            interaction,
            'スロットログ',
            `<@${userId}> がスロットで ${bet} IP を賭けました。 (結果: [ ${result1} | ${result2} | ${result3} ])`,
            color,
            [
                { name: '賭け金', value: `ῑ${bet} IP`, inline: true },
                { name: '損益', value: `${profit >= 0 ? '+' : ''}ῑ${profit} IP`, inline: true },
                { name: '新残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            ]
        );

        const resultDisplay = `[ ${result1} | ${result2} | ${result3} ]`;
        const payout = Math.floor(bet * multiplier);
        const diffText = profit >= 0 ? `+ῑ${profit} IP` : `-ῑ${bet} IP`;

        const resultEmbed = new EmbedBuilder()
            .setTitle('スロット結果')
            .setDescription(`${resultDisplay}\n\n${outcomeMessage}`)
            .setColor(color)
            .addFields(
                { name: '賭け金', value: `ῑ${bet} IP`, inline: true },
                { name: '損益', value: diffText, inline: true },
                { name: '払戻金', value: `ῑ${payout} IP`, inline: true },
                { name: '現在の残高', value: `ῑ${data.balances[userId]} IP`, inline: true }
            )
            .setTimestamp();

        return interaction.editReply({
            content: '',
            embeds: [resultEmbed]
        });
    }
};
