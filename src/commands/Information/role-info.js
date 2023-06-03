const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role-info")
        .setDescription("Receive information about a role in the server.")
        .addRoleOption(option =>
            option.setName("role")
                .setDescription("*Choose the role to acquire the details of.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const role = interaction.options.getRole('role');

        if (!role || !role.id) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`\`⚠️\` **•** The specified role does not exist.`)
            ],
            ephemeral: true
        })

        if (role.name === "@everyone") return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`\`⚠️\` **•** ${role.name} role is not available. The role cannot be \`@everyone\`.`)
            ],
            ephemeral: true
        }) 

        const createdTime = parseInt(role.createdTimestamp / 1000);
        const mentionable = role.mentionable ? "true" : "false";
        const managed = role.managed ? "true" : "false";
        const hoisted = role.hoisted ? "true" : "false";
        const position = role.position
        const botrole = role.botrole ? "true" : "false";
        const permissions = role.permissions
            .toArray()
            .map((P) => `${P}`)
            .join(", ");

        const embed = new EmbedBuilder()
            .setAuthor({ name: `@${role.name} | Role Information` })
            .setColor(role.color)
            .addFields(
                { name: "Name", value: `${role.name}`, inline: true },
                { name: "Color", value: `${role.hexColor}`, inline: true },
                { name: "Mention", value: `\`<@&${role.id}>\``, inline: true },
                { name: "Hoisted", value: `${hoisted}`, inline: true },
                { name: "Position", value: `${position}`, inline: true },
                { name: "Mentionable", value: `${mentionable}`, inline: true },
                { name: "Managed", value: `${managed}`, inline: true },
                { name: "Bot Role", value: `${botrole}`, inline: true },
                { name: "Created", value: `<t:${createdTime}:R>`, inline: true },
                { name: "Key Permissions", value: `${permissions}`, inline: false },
            )
            .setFooter({ text: `Role ID: ${role.id}` })
            .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}