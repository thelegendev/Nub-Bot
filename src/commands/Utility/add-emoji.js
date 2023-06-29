const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-emoji')
    .setDescription('Specified emoji will be added to the server.')
    .addAttachmentOption(option => option.setName('emoji').setDescription('Specified file will be uploaded and used as an emoji.').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription(`Specified name will be the emoji's name`).setRequired(true).setMinLength(2).setMaxLength(30)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const name = interaction.options.getString('name');
        const upload = interaction.options.getAttachment('emoji');
 
        await interaction.reply({ content: `Loading your **emoji**...`});
 
        const emoji = await interaction.guild.emojis.create({
 
            name: `${name}`,
            attachment: `${upload.attachment}`
 
        }).catch(err => {
            setTimeout(() => {
                return interaction.editReply({ content: `Upload **failed**! **Err**: ${err.rawError.message}`});
            }, 2000)
        })
 
        setTimeout(() => {
            if (!emoji) return;
 
            const embed = new EmbedBuilder()
            .setColor("#2f3136")
            .setAuthor({ name: `Emoji Tool`})
            .setFooter({ text: `Emoji Added`})
            .setTimestamp()
            .setTitle('Emoji Added')
            .addFields({ name: `Emoji's Name`, value: `Emoji added as: "<:${name}:${emoji.id}>"`})
 
            interaction.editReply({ content: ``, embeds: [embed]});
        }, 3000)
    }
}