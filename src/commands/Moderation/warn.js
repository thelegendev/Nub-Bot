const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const warningSchema = require("../../Schemas.js/warnSchema");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn an user within the server.')
    .addUserOption(option => option.setName("target").setDescription("The user you want to warn").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("This is the reason for warning the user").setRequired(false)),
    async execute(interaction, client) {

        const warnUser = interaction.options.getUser('target');
        const warnMember = await interaction.guild.members.fetch(warnUser.id);
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "You don't have permission to warn people!", ephemeral: true });

        if (!warnMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server.', ephemeral: true})

        if (!warnMember.kickable) return interaction.reply({ content: 'I cannot warn this user because they are either higher than me or you.', ephemeral: true})

        if (interaction.member.id === warnMember.id) return interaction.reply({content: "You cannot warn yourself!", ephemeral: true})

        if (warnMember.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: "You cannot warn staff members or people with the Administrator permission!", ephemeral: true})
 
        const { options, guildId, user } = interaction;
 
        const target = options.getUser("target");
        const reason = options.getString("reason") || "No reason given";
 
        const userTag = `${target.username}#${target.discriminator}`;
        let guild = await interaction.guild.fetch();
 
        warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
 
            if (err) throw err;
 
            if (!data) {
                data = new warningSchema({
                    GuildID: guildId,
                    UserID: target.id,
                    UserTag: userTag,
                    Content: [
                        {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason
                        }
                    ],
                });
 
            } else {
                const warnContent = {
                    ExecuterId: user.id,
                    ExecuterTag: user.tag,
                    Reason: reason
                }
                data.Content.push(warnContent);
            }
            data.save()
        });
 
        const dmEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Moderation Notice')
        .setDescription(` \n ${warnUser.tag}, \n \`You have been warned in ${guild.name}\` \n \n \n **Reason:** \n ${reason} \n \n **Responsible Moderator:** \n ${interaction.user.tag} | (<@${interaction.user.id}>:${interaction.user.id})`)
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`:white_check_mark: ${target.tag} has been **warned** | ${reason}`)
        .setTimestamp()
 
        target.send({ embeds: [dmEmbed] }).catch(err => {
            return;
        })
 
        interaction.reply({ embeds: [embed] });
    }
}