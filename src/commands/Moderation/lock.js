const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock the specified channel.')
    .addChannelOption(option => option.setName('channel').setDescription('The channel you want to lock').addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: "You must have the Manage Channels permission to use this command", ephemeral: true});
 
        let channel = interaction.options.getChannel('channel');
 
        channel.permissionOverwrites.create(interaction.guild.id, {SendMessages: false})
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`${channel} has been locked.`)
        .setFooter({ text: `Channel Locked`})
 
        await interaction.reply({ embeds: [embed] });
    }
}