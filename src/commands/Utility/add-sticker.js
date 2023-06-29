const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-sticker')
    .setDescription('Specified file will be added as a sticker in the server.')
    .addAttachmentOption(option => option.setName('sticker').setDescription(`Specified PNG/JPEG file will be uploaded as a sticker.`).setRequired(true))
    .addStringOption(option => option.setName('name').setDescription(`Specified name will be the sticker's name`).setRequired(true).setMinLength(2).setMaxLength(29)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const name = interaction.options.getString('name');
        const upload = interaction.options.getAttachment('sticker');
 
        if (upload.contentType === 'Image/gif') return await interaction.reply({ content: `You **cannot** upload animated stickers!`, ephemeral: true});
 
        await interaction.reply({ content: `Loading your **sticker**...`});
 
        const sticker = await interaction.guild.stickers.create({
 
            file: `${upload.attachment}`,
            name: `${name}`
 
        }).catch(err => {
            setTimeout(() => {
                return interaction.editReply({ content: `Upload **failed**! **Err**: ${err.rawError.message}`});
            }, 2000);
        });
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setAuthor({ name: `Sticker Tool`})
        .setFooter({ text: `Sticker Added`})
        .setTimestamp()
        .setTitle('Sticker Added')
        .addFields({ name: `Sticker's Name`, value: `Sticker added as: "**${name}**"`})
 
        setTimeout(() => {
            if (!sticker) return;
 
            interaction.editReply({ content: '', embeds: [embed] });
        }, 3000);
    }
}