const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const warningSchema = require(`../../Schemas.js/warnSchema`);
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`clear-warn`)
    .setDescription(`Clear a user's warnings.`)
    .addUserOption(option => option.setName('user').setDescription(`The user you want to clear the warnings of.`).setRequired(true)),
    async execute(interaction) {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You dont have permission to clear peoples warnings.", ephemeral: true});
 
        const { options, guildId } = interaction;
 
        const target = options.getUser('user');
 
        const embed = new EmbedBuilder()
 
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag }, async (err, data) => {
 
            if (err) throw err;
 
            if (data) {
                await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: target.tag})
 
                embed.setColor("#2f3136")
                .setDescription(`${target.tag}'s warnings have been cleared.`)
                .setFooter({ text: `User's Warnings Cleared`})
 
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ content: `${target.tag} has no warnings to be cleared.`, ephemeral: true})
            }
        });
 
 
    }
}