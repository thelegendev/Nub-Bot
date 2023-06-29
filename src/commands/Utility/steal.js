const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('steal')
    .setDescription('Add the specified emoji to the server.')
    .addStringOption(option => option.setName('emoji').setDescription('The emoji you want to add to the server').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('The name for your emoji').setRequired(true)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return await interaction.reply({ content: "You **do not** have the permission to do that!", ephemeral: true});
 
        let emoji = interaction.options.getString('emoji')?.trim();
        const name = interaction.options.getString('name');
 
        if (emoji.startsWith("<") && emoji.endsWith(">")) {
        const id = emoji.match(/\d{15,}/g)[0];
 
        const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .then(image => {
            if (image) return "gif"
            else return "png"
        }).catch(err => {
            return "png"
        })
 
            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }
 
        if (!emoji.startsWith("http")) {
            return await interaction.reply({ content: "You cannot steal default emojis!", ephemeral: true})
        }
 
        if (!emoji.startsWith("https")) {
            return await interaction.reply({ content: "You cannot steal default emojis!", ephemeral: true})
        }
 
        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}`})
        .then(emoji => {
            const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setDescription(`Added ${emoji} as **${name}**`)
            .setFooter({ text: `Emoji Added`})
            .setTimestamp()
 
            return interaction.reply({ embeds: [embed] });
        }).catch(err => {
            interaction.reply({ content: "You cannot add this emoji because you have reached your server emoji limit", ephemeral: true})
        })
    }
 
}