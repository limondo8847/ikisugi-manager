const { Client, GatewayIntentBits } = require('discord.js');
const { commands, commandBuilders } = require('./src/commands');
const { checkAndExecuteSplits, startMarketInterval } = require('./src/services/market');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('ready', async () => {
    console.log(`ログイン完了: ${client.user.tag}`);

    // スラッシュコマンド登録
    try {
        await client.application.commands.set(commandBuilders);
        console.log('スラッシュコマンドを登録しました。');
    } catch (error) {
        console.error('スラッシュコマンドの登録に失敗しました:', error);
    }

    // 起動時の自動分割チェック
    await checkAndExecuteSplits(client);

    // 市場変動タイマー起動
    startMarketInterval(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(`コマンド実行エラー (${interaction.commandName}):`, error);
        const replyOptions = { content: 'コマンド実行中にエラーが発生しました。', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    }
});

// ボットログイン
client.login(process.env.DISCORD_TOKEN);
