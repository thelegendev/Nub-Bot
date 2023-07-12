const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require(`discord.js`);
const warningSchema = require(`../../Schemas.js/warnSchema`);
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`warnings`)
    .setDescription(`Shows an user's warnings within the server.`)
    .addUserOption(option => option.setName('user').setDescription(`THe member you want to check the warns of`).setRequired(true)),
    async execute(interaction) {
 
        const { options, guildId, user } = interaction;
 
        const target = options.getUser('user');
 
        const embed = new EmbedBuilder()
        const noWarns = new EmbedBuilder()
 
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: target.tag }, async (err, data) => {
 
            if (err) throw err;
 
            if (data) {
                embed.setColor("#2f3136")
                .setTitle(`${target.tag}'s warnings`)
                .setFooter({ text: `Warnings Count`})
                
                .setDescription(`${data.Content.map(
                    (w, i) => 
                    `
                    \n**Warning**: ${i + 1}
                    \n**Reason**: ${w.Reason}
                    \n**Responsible Moderator**: ${w.ExecuterTag}
                    `
                ).join(`------------------------------------`)}`)
                .setTimestamp()
 
                interaction.reply({ embeds: [embed] });
            } else {
                noWarns.setColor("#2f3136")
                .setDescription(`${target.tag} has **0** warnings!`)
                .setTimestamp()
 
                interaction.reply({ embeds: [noWarns]})
            }
        });
 
    }
}