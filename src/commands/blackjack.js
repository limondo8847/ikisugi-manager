const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { updatePanel } = require('../services/panel');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('ブラックジャックにIPを賭けます（勝利:2倍）')
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
            return interaction.reply({ content: `残高が不足しています。賭け金は **ῑ${bet} IP** ですが、現在の所持額は **ῑ${balance} IP** です。`, ephemeral: true });
        }

        data.balances[userId] = balance - bet;
        saveData();
        await updatePanel(client);

        const suits = ['♠', '♥', '♦', '♣'];
        const values = [
            { name: 'A', value: 11 }, { name: '2', value: 2 }, { name: '3', value: 3 },
            { name: '4', value: 4 }, { name: '5', value: 5 }, { name: '6', value: 6 },
            { name: '7', value: 7 }, { name: '8', value: 8 }, { name: '9', value: 9 },
            { name: '10', value: 10 }, { name: 'J', value: 10 }, { name: 'Q', value: 10 },
            { name: 'K', value: 10 }
        ];

        function drawCard() {
            const suit = suits[Math.floor(Math.random() * suits.length)];
            const val = values[Math.floor(Math.random() * values.length)];
            return { display: `${suit}${val.name}`, score: val.value, name: val.name };
        }

        function calculateScore(hand) {
            let score = hand.reduce((sum, card) => sum + card.score, 0);
            let aces = hand.filter(card => card.name === 'A').length;
            while (score > 21 && aces > 0) {
                score -= 10;
                aces--;
            }
            return score;
        }

        function formatHand(hand, hideSecond = false) {
            if (hideSecond && hand.length >= 2) {
                return `\`[ ${hand[0].display} ]\` \`[ ❔ ]\``;
            }
            return hand.map(c => `\`[ ${c.display} ]\``).join(' ');
        }

        const playerHand = [drawCard(), drawCard()];
        const dealerHand = [drawCard(), drawCard()];

        function getGameEmbed(isFinished = false, dealerFolded = true) {
            const playerScore = calculateScore(playerHand);
            const dealerScore = dealerFolded ? '?' : calculateScore(dealerHand);

            const embed = new EmbedBuilder()
                .setTitle('ブラックジャック')
                .setColor('DarkGreen')
                .addFields(
                    { name: `ディーラーの手札 (合計: ${dealerScore})`, value: formatHand(dealerHand, dealerFolded), inline: false },
                    { name: `あなた（プレイヤー）の手札 (合計: ${playerScore})`, value: formatHand(playerHand, false), inline: false }
                )
                .setFooter({ text: `賭け金: ῑ${bet} IP` })
                .setTimestamp();

            return embed;
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bj_hit')
                    .setLabel('ヒット (Hit)')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('bj_stand')
                    .setLabel('スタンド (Stand)')
                    .setStyle(ButtonStyle.Secondary)
            );

        const message = await interaction.reply({
            embeds: [getGameEmbed(false, true)],
            components: [row],
            fetchReply: true
        });

        const filter = i => i.user.id === userId && (i.customId === 'bj_hit' || i.customId === 'bj_stand');
        const collector = message.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async buttonInteraction => {
            await buttonInteraction.deferUpdate();

            if (buttonInteraction.customId === 'bj_hit') {
                playerHand.push(drawCard());
                const currentScore = calculateScore(playerHand);

                if (currentScore > 21) {
                    collector.stop('player_bust');
                } else if (currentScore === 21) {
                    collector.stop('player_21');
                } else {
                    await interaction.editReply({
                        embeds: [getGameEmbed(false, true)],
                        components: [row]
                    });
                }
            } else if (buttonInteraction.customId === 'bj_stand') {
                collector.stop('player_stand');
            }
        });

        collector.on('end', async (collected, reason) => {
            const playerScore = calculateScore(playerHand);
            let dealerScore = calculateScore(dealerHand);

            if (reason !== 'player_bust' && reason !== 'time') {
                while (dealerScore < 17) {
                    dealerHand.push(drawCard());
                    dealerScore = calculateScore(dealerHand);
                }
            }

            let status = '';
            let statusText = '';
            let color = 'Blue';
            let payout = 0;

            if (reason === 'time') {
                status = 'lose';
                statusText = 'タイムアウトしました！時間内に操作が行われなかったため、ゲームは終了し賭け金は没収されました。';
                color = 'Red';
            } else if (playerScore > 21) {
                status = 'lose';
                statusText = 'バースト（21超え）！ あなたの負けです。';
                color = 'Red';
            } else if (dealerScore > 21) {
                status = 'win';
                statusText = 'ディーラーがバーストしました！ あなたの勝ちです！';
                color = 'Green';
                payout = bet * 2;
            } else if (playerScore > dealerScore) {
                status = 'win';
                statusText = `あなたの合計点(${playerScore})がディーラー(${dealerScore})を上回りました！ あなたの勝ちです！`;
                color = 'Green';
                payout = bet * 2;
            } else if (playerScore < dealerScore) {
                status = 'lose';
                statusText = `ディーラーの合計点(${dealerScore})があなた(${playerScore})を上回りました。 あなたの負けです。`;
                color = 'Red';
            } else {
                status = 'push';
                statusText = `引き分け (Push) です。点数(${playerScore})が同じです。賭け金が戻されます。`;
                color = 'Gold';
                payout = bet;
            }

            const currentData = getData();
            const finalBalance = (currentData.balances[userId] || 0) + payout;
            currentData.balances[userId] = finalBalance;

            saveData();
            await updatePanel(client);

            const profit = payout - bet;
            await sendActivityLog(
                client,
                interaction,
                'ブラックジャックログ',
                `<@${userId}> がブラックジャックで ${bet} IP を賭け、**${status === 'win' ? '勝利' : (status === 'lose' ? '敗北' : '引き分け')}**しました。\n(プレイヤー: ${playerScore} | ディーラー: ${dealerScore})`,
                color,
                [
                    { name: '賭け金', value: `ῑ${bet} IP`, inline: true },
                    { name: '損益', value: `${profit >= 0 ? '+' : ''}ῑ${profit} IP`, inline: true },
                    { name: '新残高', value: `ῑ${currentData.balances[userId]} IP`, inline: true }
                ]
            );

            const finalEmbed = getGameEmbed(true, false);
            finalEmbed.setColor(color);
            finalEmbed.setDescription(`${statusText}\n\n損益: **${profit >= 0 ? '+' : ''}ῑ${profit} IP** (払戻: ῑ${payout} IP)\n現在の残高: **ῑ${currentData.balances[userId]} IP**`);

            await interaction.editReply({
                embeds: [finalEmbed],
                components: []
            });
        });
    }
};
