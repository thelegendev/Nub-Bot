const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Clear messages from a user.')
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to clear (up to 99)')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Clear messages of a specific user')),
    async execute(interaction) {
        const amount = interaction.options.getString('amount');
        const user = interaction.options.getUser('user');
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
        
        if (isNaN(amount) || parseInt(amount) < 1 || parseInt(amount) > 99) {
            return interaction.reply({ content: 'Please provide a valid number between 1 and 99.', ephemeral: true });
        }
        
        await interaction.deferReply({ ephemeral: true });
        
        let messages;
        if (user) {
            messages = await interaction.channel.messages.fetch()
                .then(messages => messages.filter(m => m.author.id === user.id))
                .then(messages => messages.first(parseInt(amount)));
        } else {
            messages = await interaction.channel.messages.fetch({ limit: parseInt(amount) });
        }
        
        await interaction.channel.bulkDelete(messages, true);
        
        const deletedMessages = await interaction.channel.bulkDelete(messages, true);

  const deletedSize = deletedMessages.size;

  const deletedUser = user ? user.username : 'everyone';

  return interaction.followUp({ content: `Successfully deleted ${deletedSize} messages sent by ${deletedUser}.` });
    
    }
}