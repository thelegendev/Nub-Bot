const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    ChannelType,
    GuildVerificationLevel,
    GuildExplicitContentFilter,
    GuildNSFWLevel,
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Receive information about the server."),
    
    async execute(interaction) {
        const { guild } = interaction;
        const {
            members,
            channels,
            emojis,
            roles,
            stickers
        } = guild;
        
        const sortedRoles  = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles    = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const botCount     = members.cache.filter(member => member.user.bot).size;

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if (roleString.length + totalLength > maxFieldLength)
                    break;

                totalLength += roleString.length + 1;
                result.push(roleString);
            }

            return result.length;
        }

        const splitPascal = (string, separator) => string.split(/(?=[A-Z])/).join(separator);
        const toPascalCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
            return separator ? splitPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
        
        const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildNews,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildNewsThread,
            ChannelType.GuildCategory
        ]);

        interaction.reply({ embeds: [
            new EmbedBuilder()
                .setColor(members.me.roles.highest.hexColor)
                .setTitle(`**${guild.name}**`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .setTimestamp()
                .setFooter({text: interaction.user.username, iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
                .addFields(
                    {
                        name: "__General__",
                        value: [
                            `> 📜 **Created** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                            `> 💳 **ID** ${guild.id}`,
                            `> 👑 **Owner** <@${guild.ownerId}>`,
                            `> 🌍 **Language** ${new Intl.DisplayNames(["en"], { type: "language" }).of(guild.preferredLocale)}`,
                            `> 💻 **Vanity URL** ${guild.vanityURLCode || "None"}`,
                        ].join("\n"),
                    },
                    {
                        name: "__Security__",
                        value: [
                                `> 👀 **Explicit Filter** ${splitPascal(GuildExplicitContentFilter[guild.explicitContentFilter], " ")}`,
                                `> 🔞 **NSFW Level** ${splitPascal(GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                                `> 🔒 **Verification Level** ${splitPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`
                        ].join("\n"),
                    },
                    {
                        name: `__Users__ (${guild.memberCount})`,
                        value: [
                            `> 👥 **Members** ${guild.memberCount - botCount}`,
                            `> 🤖 **Bots** ${botCount}`
                        ].join("\n"),
                    },
                    {
                        name: `__Channels, Threads & Categories__ (${totalChannels})`,
                        value: [
                            `> 💬 **Text** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
                            `> 🔊 **Voice** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
                            `> 🧵 **Threads** ${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
                            `> 📑 **Categories** ${getChannelTypeSize([ChannelType.GuildCategory])}`
                        ].join("\n"),
                    },
                    {
                        name: `__Emojis & Stickers__ (${emojis.cache.size + stickers.cache.size})`,
                        value: [
                            `> 📺 **Animated** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                            `> 🗿 **Static** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                            `> 🏷 **Stickers** ${stickers.cache.size}`
                        ].join("\n"),
                    },
                    { 
                        name: "__Nitro Stats__",
                        value: [
                            `> 📈 **Tier** ${guild.premiumTier || "None"}`,
                            `> 💪🏻 **Boosts** ${guild.premiumSubscriptionCount}`,
                            `> 💎 **Boosters** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                            `> 🏋🏻‍♀️ **Total Boosters** ${guild.members.cache.filter(member => member.premiumSince).size}`
                        ].join("\n"),
                    },
                    { name: "__Features__", value: guild.features?.map(feature => `> ${toPascalCase(feature, " ")}`)?.join("\n") || "> None"},
                    { name: `__User Roles__ (${maxDisplayRoles(userRoles)} of ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "> None"}`},
                    { name: `__Managed Roles__ (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`, value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "> None"}`},
                    { name: "__Description__", value: `> 📝 ${guild.description || "None"}` },
                    { name: "__Banner__", value: guild.bannerURL() ? "** **" : "None" }
                )
        ], ephemeral: false });
    }
}