const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('how-gae')
    .setDescription('Results are accurate, no questions asked.')
    .addUserOption(option => option.setName('target').setDescription(`Target's gae percentage.`)),

    async execute(interaction) {
 
        let target = interaction.options.getUser('target') || interaction.user;
        let randomizer = Math.floor(Math.random() * 101);
 
        const embed = new EmbedBuilder()
        .setTitle(`How gae is ${target.username}?`)
        .setFooter({ text: `Gae Percentage`})
        .setColor('#2f3136')
        .addFields({ name: `Percentage`, value: `${target} is ${randomizer}% gae. 🍆`})
        .setTimestamp()
 
        await interaction.reply({embeds: [embed] });
 
    }
}