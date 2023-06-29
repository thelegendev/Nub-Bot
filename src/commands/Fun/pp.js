const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Better not talk about it.'),
    async execute(interaction) {
        const ppSize = Math.floor(Math.random() * 10) + 1;
        let ppMain = '8';
        for (let i = 0; i < ppSize; i++) {
            ppMain += '=';
        }

        
        const ppEmbed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${interaction.user.username}'s pp size ;-;`)
            .setDescription(`Your pp size is  ${ppMain}D`)

        await interaction.reply({ embeds: [ppEmbed] });
    },
};