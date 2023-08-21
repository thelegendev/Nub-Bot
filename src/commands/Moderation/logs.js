const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, WebhookClient }= require('discord.js');
const logSchema = require("../../Schemas.js/logSchema");
const HTTPS = require('https');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Configure the logging system.")
    .addSubcommand(command => command.setName('setup').setDescription('Sets up your logging system.').addChannelOption(option => option.setName("channel").setDescription("Specified channel will receive logs.").setRequired(false).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)))
    .addSubcommand(command => command.setName('disable').setDescription('Disables your logging system.')),
    async execute(interaction, client) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const sub = await interaction.options.getSubcommand();
        const data = await logSchema.findOne({ Guild: interaction.guild.id });

        let botMember = interaction.guild.members.cache.get(interaction.client.user.id);
        if (!botMember.permissions.has(PermissionsBitField.Flags.ManageWebhooks)) return await interaction.reply({ content: 'I **do not** have the manage webhooks permission!', ephemeral: true});

        if (data?.Webhook) {
            
            let webhookData = data.Webhook.split('/');
            let token = webhookData.pop();
            let id = webhookData.pop();

            HTTPS.request(`https://discord.com/api/v10/webhooks/${id}/${token}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).end();

            // This function doesn't exist according to their support team :|
            //await webhook.delete();
        }
 
        if (sub === 'setup') {
 
            const logchannel = interaction.options.getChannel("channel") || interaction.channel;

            try {
                const webhook = await logchannel.createWebhook({
                    avatar: client.user.displayAvatarURL({ dynamic: true }),
                    name: 'Logging System'
                });

                // Upsert means to create it if it doesn't exist
                // If it's found then update as normal
                await logSchema.findOneAndUpdate({
                    Guild: interaction.guild.id
                }, {
                    Guild: interaction.guild.id,
                    Channel: logchannel.id,
                    Webhook: webhook.url
                }, {
                    upsert: true
                });
            } catch (err) {
                console.log(err.stack);
                return await interaction.reply({ content: 'Something went wrong, make sure I have the manage webhooks permission within that channel!', ephemeral: true});
            }

            const setupembed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTimestamp()
            .setAuthor({ name: `Logging System`})
            .setFooter({ text: `Logging Enabled`})
            .setTitle('Logging Enabled')
            .addFields({ name: `Logging was Enabled`, value: `Your logging system has been set up successfuly. Your channel will now receive alerts for actions taken in your server!`})
            .addFields({ name: `Channel`, value: `${logchannel}`})

            await interaction.reply({ embeds: [setupembed] });

        } else if (sub === 'disable') {

            await logSchema.deleteMany({ Guild: interaction.guild.id })

            const disableembed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTimestamp()
            .setAuthor({ name: `Logging System`})
            .setFooter({ text: `Logging Disabled`})
            .setTitle('Logging Disabled')
            .addFields({ name: `Logging was Disabled`, value: `Your logging system has been disabled successfuly. Your logging channel will no longer receive alerts for actions taken in your server!`})

            await interaction.reply({ embeds: [disableembed] });
        }

    }
}