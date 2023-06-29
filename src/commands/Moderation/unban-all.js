const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban-all')
        .setDescription('Unban all users in the server.'),

    async execute(interaction) {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'You do not have permission to unban members.', ephemeral: true });
        }

        try {
            
            const bannedMembers = await interaction.guild.bans.fetch();
            
            await Promise.all(bannedMembers.map(member => {
                return interaction.guild.members.unban(member.user.id);
            }));
           
            return interaction.reply({ content: 'All members have been unbanned from the server.', ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while unbanning members.', ephemeral: true });
        }
    },
};