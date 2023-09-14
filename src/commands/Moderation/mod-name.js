const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mod-name')
    .setDescription(`Moderate a user's nickname.`)
    .addUserOption(option =>
        option.setName('target')
            .setDescription('The user to moderate')
            .setRequired(true)),

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))
        return await interaction.reply({ content: "You don't have permission to use this command!"})

        await interaction.deferReply();

        const { options } = interaction;
        const target = options.getUser('target')
        const member = await interaction.guild.members.fetch(target.id).catch(err => {});
        const tag = Math.floor(Math.random() * 10000) + 1;

        const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setTitle('Nickname Moderated')
        .setDescription(`Username: **${target.username}**\nNickname: **Moderated Nickname ${tag}**`)
        .setTimestamp()

        try {
            await member.setNickname(`Moderated Nickname ${tag}`);
        } catch (e) {
            return await interaction.editReply({ content: `Unable to moderate ${target.username}'s nickname!` });
        }

        await interaction.editReply({ embeds: [embed ]});

    }
}