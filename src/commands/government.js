const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getData } = require('../dataStore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('government')
        .setDescription('政府資金の残高と税率の情報を表示します'),
    async execute(interaction, client) {
        const data = getData();
        const govFunds = data.governmentFunds !== undefined ? data.governmentFunds : 100000;
        const embed = new EmbedBuilder()
            .setTitle('政府財政状況 (Government Finance)')
            .setColor('Blue')
            .addFields(
                { name: '政府資金残高', value: `ῑ${govFunds} IP`, inline: true },
                { name: '譲渡税率（送金手数料）', value: '10%', inline: true },
                { name: '所得税率（労働給与）', value: '10%', inline: true }
            )
            .setDescription('一般ユーザー間の送金、および労働による給料の10%が政府資金に納税されます。また、労働時の給料は政府資金から支払われます。')
            .setTimestamp();
        return interaction.reply({ embeds: [embed] });
    }
};
