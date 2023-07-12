const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const levelSchema = require(`../../Schemas.js/levelSchema`);
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('server-xp-reset')
    .setDescription(`Reset all of the server user's xp.`),
    async execute(interaction, client) {
 
                const perm = new EmbedBuilder()
                .setColor("#2f3136")
                .setDescription(`You don't have permission to reset xp levels in this server`)
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ embeds: [perm], ephemeral: true })
 
                const { guildId } = interaction;
 
                const embed = new EmbedBuilder()
 
                levelSchema.deleteMany({ Guild: guildId}, async (err, data) => {
 
                    embed.setColor("#2f3136")
                    .setDescription(`The xp system in your server has been reset`)
                    .setFooter({ text: `Server XP reset`})
 
                    return interaction.reply({ embeds: [embed] });
                })
    }
}