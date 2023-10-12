const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Check the bot's latency.`),
    
    async execute(interaction) {
        let circles = {
            good: '<:high:1160823035952107620>',
            okay: '<:mid:1160823054000197672>',
            bad: '<:low:1160823069443629056>',
        };

        const ws = interaction.client.ws.ping;
        const msgEdit = Date.now() - interaction.createdTimestamp;
 
        const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
        const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;

        const embed = new EmbedBuilder()
        .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
        .setColor('#2f3136')
        .setTimestamp()
        .setFooter({ text: `Latency Recorded` })
        .addFields(
            {
                name: 'Websocket Latency',
                value: `${wsEmoji} \`${ws}ms\``,
            },
            {
                name: 'API Latency',
                value: `${msgEmoji} \`${msgEdit}ms\``,
            }
        );

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

            if (i.user.id !== interaction.user.id) 
            return i.reply({ content: `This button is not for you!`, ephemeral: true });

            if(i.customId == 'btn') {
                i.update({ embeds: [
                    new EmbedBuilder()
                    .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter({ text: `Latency Recorded` })
                    .addFields(
                        {
                            name: 'Websocket Latency',
                            value: `${wsEmoji} \`${ws}ms\``,
                        },
                        {
                            name: 'API Latency',
                            value: `${msgEmoji} \`${msgEdit}ms\``,
                        }
                    )
                ], components: [btn] })
            }
        })
    }
}
