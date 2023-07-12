const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('bonk')
    .setDescription('Bonk an user.')
    .addUserOption(option => option
        .setName('target')
        .setDescription('The mentioned user will get bonked.')
        .setRequired(true)
    ),
    
    async execute(interaction) {

        const target = await interaction.options.getUser('target');

        let image = 'https://media.tenor.com/Tg9jEwKCZVoAAAAd/bonk-mega-bonk.gif';
 
        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setTitle(`${target.tag} got bonked!`)
        .setImage(`${image}`)
        .setFooter({ text: `aw man that hurts.`})
 
        await interaction.reply({ embeds: [embed] });
    }
}