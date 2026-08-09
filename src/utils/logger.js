const { EmbedBuilder } = require('discord.js');
const { getData } = require('../dataStore');

async function sendLog(client, interaction, targetUser, amount, isAdmin) {
    const data = getData();
    if (!data.logChannelId) return;

    try {
        const logChannel = await client.channels.fetch(data.logChannelId);
        if (!logChannel || !logChannel.isTextBased()) return;

        const sender = interaction.user;
        const action = isAdmin ? (amount > 0 ? '管理者送金' : '管理者剥奪') : 'ユーザー送金';
        const color = amount > 0 ? 'Green' : 'Red';

        const logEmbed = new EmbedBuilder()
            .setTitle(`取引ログ: ${action}`)
            .setColor(color)
            .addFields(
                { name: '実行者', value: `<@${sender.id}> (\`${sender.id}\`)`, inline: true },
                { name: '対象者', value: `<@${targetUser.id}> (\`${targetUser.id}\`)`, inline: true },
                { name: '金額', value: `ῑ${Math.abs(amount)} IP`, inline: true },
                { name: '対象者の残高', value: `ῑ${data.balances[targetUser.id] || 0} IP`, inline: true }
            )
            .setTimestamp();

        if (!isAdmin) {
            logEmbed.addFields(
                { name: '実行者の残高', value: `ῑ${data.balances[sender.id] || 0}`, inline: true }
            );
        }

        await logChannel.send({ embeds: [logEmbed] });
    } catch (error) {
        console.error('ログの送信に失敗しました。', error);
    }
}

async function sendActivityLog(client, interaction, title, description, color = 'Blue', fields = []) {
    const data = getData();
    if (!data.logChannelId) return;

    try {
        const logChannel = await client.channels.fetch(data.logChannelId);
        if (!logChannel || !logChannel.isTextBased()) return;

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();

        if (fields.length > 0) {
            embed.addFields(fields);
        }

        await logChannel.send({ embeds: [embed] });
    } catch (error) {
        console.error('アクティビティログの送信に失敗しました。', error);
    }
}

async function announceSplit(client, type, symbol, factor, oldPrice, newPrice) {
    const data = getData();
    if (!data.logChannelId) return;

    try {
        const logChannel = await client.channels.fetch(data.logChannelId);
        if (!logChannel || !logChannel.isTextBased()) return;

        const typeName = type === 'stock' ? '株式' : '仮想通貨';
        const embed = new EmbedBuilder()
            .setTitle(`【市場ニュース】${typeName}分割のお知らせ`)
            .setDescription(`価格が高騰したため、**${symbol}** の${typeName}分割が実施されました。`)
            .setColor('Blue')
            .addFields(
                { name: '銘柄', value: symbol, inline: true },
                { name: '分割比率', value: `1 : ${factor}`, inline: true },
                { name: '旧価格', value: `ῑ${oldPrice} IP`, inline: true },
                { name: '新価格', value: `ῑ${newPrice} IP`, inline: true },
                { name: '影響', value: '保有されているすべてのユーザーの数量が自動的に増加し、総評価額は維持されます。', inline: false }
            )
            .setTimestamp();

        await logChannel.send({ embeds: [embed] });
    } catch (error) {
        console.error('分割アナウンスの送信に失敗しました。', error);
    }
}

module.exports = {
    sendLog,
    sendActivityLog,
    announceSplit
};
