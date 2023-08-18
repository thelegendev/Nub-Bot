const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Check the bot's latency.`),
    
        async execute(interaction) {
        let circles = {
            good: '<:high:1141959052289638440>',
            okay: '<:mid:1141959164453736479>',
            bad: '<:low:1141959216383402044>',
        };
 
        await interaction.deferReply();
 
        const pinging = await interaction.editReply({ content: 'Obtaining ping...' });
 
        const ws = interaction.client.ws.ping;
        const msgEdit = Date.now() - pinging.createdTimestamp;
 
        const wsEmoji = ws <= 100 ? circles.good : ws <= 200 ? circles.okay : circles.bad;
        const msgEmoji = msgEdit <= 200 ? circles.good : circles.bad;
 
        const pingEmbed = new EmbedBuilder()
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `Pinged At` })
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
 
        await pinging.edit({ embeds: [pingEmbed], content: '\u200b' });
    },
};
