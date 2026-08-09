const { EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');

function generateLeaderboardEmbed() {
    const data = getData();
    const govFunds = data.governmentFunds !== undefined ? data.governmentFunds : 100000;
    const embed = new EmbedBuilder()
        .setTitle('ῑ 経済状況 & 所持リスト')
        .setColor('Gold')
        .addFields({ name: '政府資金 (国庫)', value: `ῑ${govFunds} IP`, inline: false })
        .setTimestamp();

    const sorted = Object.entries(data.balances)
        .filter(([id, bal]) => bal > 0)
        .sort((a, b) => b[1] - a[1]);

    if (sorted.length === 0) {
        embed.setDescription('まだ誰もIPを所持していません。');
    } else {
        const desc = sorted.map(([id, bal], index) => {
            return `${index + 1}. <@${id}>: ῑ${bal} IP`;
        }).join('\n');
        embed.setDescription(desc);
    }

    return embed;
}

async function updatePanel(client) {
    const data = getData();
    if (!data.panels || Object.keys(data.panels).length === 0) return;

    for (const guildId of Object.keys(data.panels)) {
        const panelInfo = data.panels[guildId];
        if (!panelInfo || !panelInfo.channelId || !panelInfo.messageId) continue;

        try {
            const channel = await client.channels.fetch(panelInfo.channelId);
            if (channel) {
                const message = await channel.messages.fetch(panelInfo.messageId);
                if (message) {
                    const embed = generateLeaderboardEmbed();
                    await message.edit({ embeds: [embed] });
                }
            }
        } catch (error) {
            console.error(`サーバー (${guildId}) のパネル更新に失敗しました。`, error);
        }
    }
}

module.exports = {
    generateLeaderboardEmbed,
    updatePanel
};
