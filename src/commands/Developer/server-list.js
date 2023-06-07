const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-list')
        .setDescription('Shows all the servers the bot is currently in.'),
    async execute(interaction, client) {

        if(interaction.member.id !== '816250247616659489') return interaction.reply({ content: 'This command is locked under the developer.', ephemeral: true})

            let guilds = await client.guilds.fetch()

                const embed = new EmbedBuilder()
                .setTitle(`Nub Bot is currently in **${client.guilds.cache.size}** Servers`)
                .setColor("#2f3136")
                .addFields({ name: " ", value: guilds.map(g => `**${g.name}** (${g.id}) `).join("\n")})
                .setTimestamp()

    await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};