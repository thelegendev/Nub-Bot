const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user in the server.')
    .addUserOption(option => option.setName('user').setDescription('Specify the user you want to ban.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason as to why you want to unban specified user.').setRequired(false)),
    async execute(interaction) {
 
        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No Reason Provided';
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: 'You **do not** have the permission to do that.', ephemeral: true});
        if (interaction.member.id === target.id) return await interaction.reply({ content: 'You **cannot** unban yourself.'});
 
        if (!reason) reason = 'No reason provided'
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`**${target.tag}** has been unbanned. \nReason: **${reason}**`)
        .setFooter({ text: `User Unbanned`})
        .setTimestamp()
 
        await interaction.guild.bans.fetch() 
        .then(async bans => {
 
            if (bans.size == 0) return await interaction.reply({ content: 'There is **no one** to unban.', ephemeral: true})
            let bannedID = bans.find(ban => ban.user.id == target.id);
            if (!bannedID ) return await interaction.reply({ content: 'That user **is not** banned.', ephemeral: true})
 
            await interaction.guild.bans.remove(target.id, reason).catch(err => {
                return interaction.reply({ content: `**Couldn't** unban user specified!`, ephemeral: true})
            })
        })
 
        await interaction.reply({ embeds: [embed] });
    }
}