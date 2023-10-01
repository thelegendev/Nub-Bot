const { SlashCommandBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription('Shuts down the bot.'),
    async execute(interaction, client) {
 
        if (interaction.user.id === '816250247616659489') {
            await interaction.reply({ content: `**Shutting down...**`, ephemeral: true})
            await client.user.setStatus("invisible")
            process.exit();
        } else {
            return interaction.reply({ content: `This command is locked under the developer.`, ephemeral: true})
        }
    }
}