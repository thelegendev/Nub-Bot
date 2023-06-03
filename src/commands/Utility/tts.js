const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('tts')
    .setDescription('Send a text to speech message.')
    .addStringOption(option => option.setName('message').setDescription('Specified message will be sent as a TTS message.').setRequired(true).setMaxLength(2000)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendTTSMessages)) return await interaction.reply({ content: `You **do not** have the permission to do that!`, ephemeral: true});
 
        const message = interaction.options.getString('message');
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`${message}`)
        .setTitle(`${interaction.user.username} says...`)
        .setAuthor({ name: `TTS Tool`})
        .setFooter({ text: `TTS Message sent`})
 
        await interaction.reply({ content: `${message}`, embeds: [embed], tts: true});
        await interaction.editReply({ embeds: [embed], content: ``})
    }
}