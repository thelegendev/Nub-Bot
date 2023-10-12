const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const verifySchema = require('../../schemas/verify');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDMPermission(false)
    .setDescription('Configure the verification system.')
    .addSubcommand(command => command.setName('setup').setDescription('Setup the verification system.').addRoleOption(option => option.setName('role').setDescription('Specified role will be given to users who are verified.').setRequired(true)).addChannelOption(option => option.setName('channel').setDescription('Specified channel will be your verify channel').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)).addStringOption(option => option.setName('content').setDescription('Specified message will be included in the verification embed.').setRequired(false).setMinLength(1).setMaxLength(1000)))
    .addSubcommand(command => command.setName('disable').setDescription('Disable the verification system.')),
    async execute(interaction, client) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const data = await verifySchema.findOne({ Guild: interaction.guild.id });
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
            case 'setup':
 
            const role = await interaction.options.getRole('role');
            const channel = await interaction.options.getChannel('channel');
            const message = await interaction.options.getString('content') || 'Click the button below to start your verification process!';
 
            if (data) return await interaction.reply({ content: "You **already** have a verification system **set up**! \n> Use `/verify disable` to undo.", ephemeral: true});
            else {
 
                await verifySchema.create({
                    Guild: interaction.guild.id,
                    Role: role.id,
                    Channel: channel.id,
                    Message: 'empty',
                    Verified: []
                })
 
                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('verify')
                    .setLabel('✅ Verify')
                    .setStyle(ButtonStyle.Success)
                )
 
                const verify = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle('Verification Process')
                .setAuthor({ name: `Verification System`})
                .setFooter({ text: `Verification Prompt`})
                .setDescription(`> ${message}`)
 
                interaction.reply({ content: `Your **verification system** has been set up!`, ephemeral: true});
                const msg = await channel.send({ embeds: [verify], components: [buttons] });
 
                await verifySchema.updateOne({ Guild: interaction.guild.id }, { $set: { Message: msg.id }});
            }
 
            break;
            case 'disable':
 
            if (!data) return await interaction.reply({ content: `The **verification system** has not been **set up** yet, cannot delete **nothing**...`, ephemeral: true});
            else {
 
                await verifySchema.deleteMany({ Guild: interaction.guild.id });
                const deletemsg = await client.channels.cache.get(data.Channel).messages.fetch(data.Message);
                await deletemsg.delete();
 
                await interaction.reply({ content: `Your **verification system** has successfully been **disabled**!`, ephemeral: true});
 
            }
        }
    }
}