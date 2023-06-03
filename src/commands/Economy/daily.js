const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoS = require('../../Schemas.js/ecoSchema');
 
var timeout = [];
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily boost.'),
 
    async execute(interaction) {
        const { options, guild, user } = interaction;
        
        let data = await ecoS.findOne({ Guild: guild.id, User: user.id });
 
        if (timeout.includes(interaction.user.id)) return await interaction.reply({ content: "Come back later to claim", ephemeral: true });
 
        if (!data) return await interaction.reply({ content: "You don't have an account, create one using `/economy-create account.`", ephemeral: true });
        else {
            const randAmount = Math.round((Math.random() * 3000) + 10);
 
            data.Bank += randAmount;
            data.CommandsRan += 1;
            data.save();
 
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${user.tag}'s Account`, iconURL: user.avatarURL() })
                .setColor('#2f3136')
                .setDescription(`You claimed your daily boost!\n\n• Amount: **$${randAmount}**\n• Next claim available: **24 hours**`)
                .setFooter({ text: `${guild.name}'s Economy` })
                .setTimestamp();
 
            await interaction.reply({ embeds: [embed] });
 
            timeout.push(interaction.user.id);
            setTimeout(() => {
                timeout.shift();
            }, 86400000);
        }
    }
}