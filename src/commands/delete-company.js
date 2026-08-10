const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData, saveData } = require('../dataStore');
const { sendActivityLog } = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-company')
        .setDescription('会社を市場から削除します（管理者専用）')
        .addStringOption(opt => opt.setName('symbol').setDescription('削除する会社シンボル').setRequired(true)),
    async execute(interaction, client) {
        // 管理者権限チェック
        if (!interaction.memberPermissions || !interaction.memberPermissions.has('Administrator')) {
            const err = new EmbedBuilder().setTitle('権限エラー').setDescription('このコマンドを実行できるのはサーバ管理者のみです。').setColor('Red').setTimestamp();
            return interaction.reply({ embeds: [err], ephemeral: true });
        }

        const symbol = String(interaction.options.getString('symbol')).toUpperCase().trim();
        const data = getData();

        if (!data.companies || !data.companies[symbol]) {
            const err = new EmbedBuilder().setTitle('エラー').setDescription('指定した会社が存在しません。').setColor('Red').setTimestamp();
            return interaction.reply({ embeds: [err], ephemeral: true });
        }

        // 会社データと市場価格・履歴を削除
        delete data.companies[symbol];
        if (data.market && data.market.stocks && data.market.stocks[symbol] !== undefined) {
            delete data.market.stocks[symbol];
        }
        if (data.marketHistory && data.marketHistory.stocks && data.marketHistory.stocks[symbol]) {
            delete data.marketHistory.stocks[symbol];
        }

        // 全ユーザーの保有株を消す（もしくは買い取り処理を実装する場合はここを変更）
        if (data.assets) {
            for (const uid of Object.keys(data.assets)) {
                if (data.assets[uid].stocks && data.assets[uid].stocks[symbol] !== undefined) {
                    delete data.assets[uid].stocks[symbol];
                }
            }
        }

        saveData();

        await sendActivityLog(client, interaction, '会社削除ログ', `会社 **${symbol}** を削除しました（by <@${interaction.user.id}>）。`, 'Red', [
            { name: '銘柄', value: symbol, inline: true }
        ]);

        const embed = new EmbedBuilder().setTitle('会社削除完了').setDescription(`${symbol} を市場から削除しました。関連する保有株も削除されます。`).setColor('Red').setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
};
