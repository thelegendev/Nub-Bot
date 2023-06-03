const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription(`Untime out an user within the server.`)
    .addUserOption(option => option.setName('target').setDescription('The user you would like to untimeout').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for untiming out the user')),
    async execute(interaction, message, client) {
 
        const timeUser = interaction.options.getUser('target');
        const timeMember = await interaction.guild.members.fetch(timeUser.id);
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ content: "You must have the Moderate Members permission to use this command!", ephemeral: true})
        if (!timeMember.kickable) return interaction.reply({ content: 'I cannot timeout this user! This is either because their higher then me or you.', ephemeral: true})
        if (interaction.member.id === timeMember.id) return interaction.reply({content: "You cannot timeout yourself!", ephemeral: true})
        if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "You cannot untimeout staff members or people with the Administrator permission!", ephemeral: true})
 
        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given."
 
        await timeMember.timeout(null, reason)
 
            const minEmbed = new EmbedBuilder()
            .setColor("#2f3136")
            .setDescription(`${timeUser.tag}'s timeout has been **removed** | ${reason}`)
 
            const dmEmbed = new EmbedBuilder()
            .setDescription(`You have been **untimed out** in ${interaction.guild.name} | ${reason}`)
            .setColor(`#2f3136`)
 
            await timeMember.send({ embeds: [dmEmbed] }).catch(err => {
                return;
            })
 
            await interaction.reply({ embeds: [minEmbed] })
 
 
 
    },
}