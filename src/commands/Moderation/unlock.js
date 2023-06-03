const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlock the specified channel.')
    .addChannelOption(option => option.setName('channel').setDescription('The channel you want to unlock').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: "You must have the Manage Channels permission to use this command", ephemeral: true});
 
        let channel = interaction.options.getChannel('channel');
 
        channel.permissionOverwrites.create(interaction.guild.id, {SendMessages: true})
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`:white_check_mark: ${channel} has been unlocked.`) 
 
        await interaction.reply({ embeds: [embed] });
    }
}