const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick an user from the server.')
    .addUserOption(option => option.setName('target').setDescription('The user you would like to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user')),
    async execute (interaction, client) {
 
        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;
        let guild = await interaction.guild.fetch();
 
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You must have the **Kick Members** permission to use this command.", ephemeral: true});
        if(!kickMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server', ephemeral: true})
        if(!kickMember.kickable) return await interaction.reply({ content: "I cannot kick this user because they are either higher than me or you.", ephemeral: true})
        if (interaction.member.id === kickMember.id) return interaction.reply({content: "You cannot kick yourself!", ephemeral: true})
        if (kickMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "You cannot kick staff members or people with the Administrator permission!", ephemeral: true})
 
        let reason = interaction.options.getString('reason');
        if(!reason) reason = "No reason provided";
 
        const dmEmbed = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle('Moderation Notice')
        .setDescription(` \n ${kickUser.tag}, \n \`You have been kicked from ${guild.name}\` \n \n \n Reason: \n ${reason} \n \n Responsible Moderator: \n ${interaction.user.tag}`)
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`**${kickUser.tag}** has been kicked. \nReason: **${reason}**`)
        .setFooter({ text: `User Kicked`})
        .setTimestamp()
 
        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        });
 
        await kickMember.kick({ reason: reason}).catch(err => {
            interaction.reply({ content: "There was an error", ephemeral: true});
        });
 
        await interaction.reply({ embeds: [embed] });
    }
}