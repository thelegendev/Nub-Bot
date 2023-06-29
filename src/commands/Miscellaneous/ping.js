const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Check the bot's latency.`),
    
    async execute(interaction, client) {
        const icon = interaction.user.displayAvatarURL();
        const tag = interaction.user.tag;

        const embed = new EmbedBuilder()
        .setTitle('**🏓 Pong!**')
        .setDescription(`**\`📡 LATENCY: ${client.ws.ping} ms\`**`)
        .setColor("#2f3136")
        .setFooter({ text: `Latency Recorded`})
        .setTimestamp()

        const btn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('btn')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('🔁')
        )

        const msg = await interaction.reply({ embeds: [embed], components: [btn] })

        const collector = msg.createMessageComponentCollector()
        collector.on('collect', async i => {
            if(i.customId == 'btn') {
                i.update({ embeds: [
                    new EmbedBuilder()
                    .setTitle('**🏓 Pong!**')
                    .setDescription(`**\`📡 LATENCY: ${client.ws.ping} ms\`**`)
                    .setColor("#2f3136")
                    .setFooter({ text: `Latency Recorded`})
                    .setTimestamp()
                ], components: [btn] })
            }
        })
    }
}