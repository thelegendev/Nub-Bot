const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Send something to the specified channel.')
    .addChannelOption(option => option.setName('channel').setDescription('The channel to send your message to').setRequired(true))
    .addStringOption(option => option.setName('message').setDescription('The message to send to the channel').setRequired(true)),
    async execute(interaction, client) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You **do not** have the permission to do that!", ephemeral: true})
        const channel = interaction.options.getChannel('channel');
        let message = interaction.options.getString('message');
 
        await channel.send(message)
 
        await interaction.reply({ content: `Successfully sent ${message} to ${channel}`, ephemeral: true})
    }
}