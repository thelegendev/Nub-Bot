const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription("Impersonate a user with a webhook.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user you want to impersonate.")
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("message")
        .setDescription("The message you want the user to say.")
        .setRequired(true)
    )
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("Sends this message to a specified channel.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
 
    async execute (interaction) {

        const member = interaction.options.getUser("user");
        const message = interaction.options.getString("message");
        const channelx = interaction.options.getChannel("channel");
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.createWebhook)) return await interaction.reply({
            content: "You cant use this command!"
        })
 
        if (message.includes('@everyone') || message.includes('@here')) return await interaction.reply({ 
            content: `You cannot mention everyone/here with this command`, 
            ephemeral: true
        });
 
        await channelx.createWebhook({
            name: member.username,
            avatar: member.displayAvatarURL({ dynamic: true })
        }).then((webhook) => {
            webhook.send({content: message});
            setTimeout(() => {
                webhook.delete();
            }, 3000)
        });
 
        await interaction.reply({
            content: `<@${member.id}> has been impersonated in <#${channelx.id}>`,
            ephemeral: true
        });
    }
}