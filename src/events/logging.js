const { EmbedBuilder, WebhookClient } = require("discord.js");

function logging(client) {
 
    const logSchema = require("../schemas/log");
 
    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (data) => {
            if (!data || !data.Webhook) return;

            try {
                const webhook = new WebhookClient({ url: data.Webhook });
                if (!webhook) return;

                await webhook.send({
                    embeds: [embed]
                });
            } catch (err) { }
        });
    }
 
    client.on("messageDelete", function (message) {
 
        try {
            if (message.guild === null) return;
            if (message.author.bot) return;
 
            const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Author`, value: `<@${message.author.id}> - *${message.author.tag}*`})
            .addFields({ name: `Channel`, value: `${message.channel}`})
            .addFields({ name: `Deleted Message`, value: `${message.content}`})
            .setFooter({ text: `Logging System`})
 
            return send_log(message.guild.id, embed);
        } catch (err) {
            console.log(`Couldn't log deleted msg`)
        }
 
    });
 
    client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
 
        try {
            if (channel.guild === null) return;
 
            const embed = new EmbedBuilder()
            .setTitle('Topic Changed')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Channel`, value: `${channel}`})
            .addFields({ name: `Old Topic`, value: `${oldTopic}`})
            .addFields({ name: `New Topic`, value: `${newTopic}`})
            .setFooter({ text: `Logging System`})
 
            return send_log(channel.guild.id, embed);
 
        } catch (err) {
            console.log('Err logging topic update')
        }
    });

    client.on("guildChannelPermissionsUpdate", (channel) => {
 
        try {
            if (channel.guild === null) return;
 
            const embed = new EmbedBuilder()
            .setTitle('Channel Updated')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Channel`, value: `${channel}`})
            .addFields({ name: `Changes`, value: `Channel's permissions/name were updated`})
            .setFooter({ text: `Logging System`})
 
            return send_log(channel.guild.id, embed);
        } catch (err) {
            console.log('Err logging channel update')
        }
    })

    client.on("unhandledGuildChannelUpdate", (oldChannel) => {
 
        try {
 
        if (oldChannel.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Channel Updated')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Channel`, value: `${oldChannel}`})
            .addFields({ name: `Changes`, value: `**Nub Bot** couldn't find any changes!`})
            .setFooter({ text: `Logging System`})
 
        return send_log(oldChannel.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging unhandled channel update')
    }
 
    });

    client.on("guildMemberBoost", (member) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle(`${member.user.username} started Boosting`)
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Server`, value: `${member.guild.name}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging member boost start')
    }
 
    })

    client.on("guildMemberUnboost", (member) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle(`${member.user.username} stopped Boosting`)
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Server`, value: `${member.guild.name}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging member boost stop')
    }
 
    })

    client.on("guildMemberRoleAdd", (member, role) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle(`${member.user.username} was given a Role`)
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Role`, value: `${role}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role give')
    }
 
    })

    client.on("guildMemberRoleRemove", (member, role) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle(`${member.user.username} lost a Role`)
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Role`, value: `${role}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role remove')
    }
 
    })

    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
 
        try {
 
        const embed = new EmbedBuilder()
            .setTitle('Nickname Updated')
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({ text: `Logging System`})
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Old Nickname`, value: `${oldNickname || '**None**'}`})
            .addFields({ name: `New Nickname`, value: `${newNickname || '**None**'}`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging nick update')
    }
 
    })

    client.on("guildMemberAdd", (member) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('User Joined')
            .setColor('#2f3136')
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Member ID`, value: `${member.user.id}`})
            .addFields({ name: `Member Tag`, value: `${member.user.tag}`})
            .setTimestamp()
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging member add')
    }
 
    });

    client.on("guildMemberRemove", (member) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('User Left')
            .setColor('#2f3136')
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `Member ID`, value: `${member.user.id}`})
            .addFields({ name: `Member Tag`, value: `${member.user.tag}`})
            .setTimestamp()
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging member leave')
    }
 
    });

    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle(`${guild.name} advanced a Boosting Level`)
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Info`, value: `**${guild.name}** advanced from level **${oldLevel}** to **${newLevel}**!`})
        .addFields({ name: `Server`, value: `${member.guild.name}`})
        .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging boost level up')
    }
 
    })

    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle(`${guild.name} lost a Boosting Level`)
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Info`, value: `**${guild.name}** lost a level, from **${oldLevel}** to **${newLevel}**!`})
        .addFields({ name: `Server`, value: `${member.guild.name}`})
        .setFooter({ text: `Logging System`})
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging boost level down')
    }
 
    })

    client.on("guildBannerAdd", (guild, bannerURL) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle(`${guild.name}'s Banner was Updated`)
            .setColor('#2f3136')
            .addFields({ name: `Banner URL`, value: `${bannerURL}`})
            .setImage(bannerURL)
            .setFooter({ text: `Logging System`})
            .setTimestamp()
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging banner change')
    }
 
    })

    client.on("guildAfkChannelAdd", (guild, afkChannel) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('AFK channel Added')
        .setColor('#2f3136')
        .addFields({ name: `AFK Channel`, value: `${afkChannel}`})
        .setTimestamp()
        .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging afk channel add')
    }
 
    })

    client.on("guildVanityURLAdd", (guild, vanityURL) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Vanity URL Added')
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Vanity URL`, value: `${vanityURL}`})
        .setFooter({ text: `Logging System`})

        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging vanity add')
    }
 
    })

    client.on("guildVanityURLRemove", (guild, vanityURL) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Vanity URL Removed')
        .setColor('#2f3136')
        .addFields({ name: `Old Vanity`, value: `${vanityURL}`})
        .setTimestamp()
        .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging vanity remove')
    }
 
    })

    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Vanity URL Updated')
        .setColor('#2f3136')
        .addFields({ name: `Old Vanity`, value: `${oldVanityURL}`})
        .addFields({ name: `New Vanity`, value: `${newVanityURL}`})
        .setTimestamp()
        .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging vanity update')
    }
 
    })

    client.on("messagePinned", (message) => {
 
        try {
 
        if (message.guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Message Pinned')
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Pinner`, value: `${message.author}`})
        .addFields({ name: `Message`, value: `${message.content}`})
        .setFooter({ text: `Logging System`})
 
        return send_log(message.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging pin add')
    }
 
    })

    client.on("messageContentEdited", (message, oldContent, newContent) => {
 
        try {
 
        if (message.guild === null) return;
        if (message.author.bot) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Message Edited')
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Member`, value: `${message.author}`})
        .addFields({ name: `Old Message`, value: `${oldContent}`})
        .addFields({ name: `New Message`, value: `${newContent}`})
        .setFooter({ text: `Logging System`})

        return send_log(message.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging message edit')
    }
 
    })

    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
 
        try {
 
        if (role.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Role position Updated')
            .setColor('#2f3136')
            .addFields({ name: `Role`, value: `${role}`})
            .addFields({ name: `Old Position`, value: `${oldPosition}`})
            .addFields({ name: `New Position`, value: `${newPosition}`})
            .setTimestamp()
            .setFooter({ text: `Logging System`})
 
        return send_log(role.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role pos update')
    }
 
    })

    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
 
        try {
 
        if (role.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Role permissions Updated')
            .setColor('#2f3136')
            .addFields({ name: `Role`, value: `${role}`})
            .addFields({ name: `Old Permissions`, value: `${oldPermissions}`})
            .addFields({ name: `New Permissions`, value: `${newPermissions}`})
            .setTimestamp()
            .setFooter({ text: `Logging System`})
 
        return send_log(role.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role perms update')
    }
 
    })

    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
 
        try {
 
        if (member.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Voice channel Switched')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${member.user}`})
            .addFields({ name: `From`, value: `${oldChannel}`})
            .addFields({ name: `To`, value: `${newChannel}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(member.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging vc switch')
    }
 
    })

    client.on("roleCreate", (role) => {
 
        try {
 
        if (role.guild === null) return;
 
            const embed = new EmbedBuilder()
            .setTitle('Role Created')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Role Name`, value: `${role.name}`})
            .addFields({ name: `Role ID`, value: `${role.id}`})
            .addFields({ name: `Role HEX`, value: `${role.hexColor}`})
            .addFields({ name: `Role Pos`, value: `${role.position}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(role.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role create')
    }
 
    });

    client.on("roleDelete", (role) => {
 
        try {
 
        if (role.guild === null) return;
 
        const embed = new EmbedBuilder()
        .setTitle('Role Deleted')
        .setColor('#2f3136')
        .setTimestamp()
        .addFields({ name: `Role Name`, value: `${role.name}`})
        .setFooter({ text: `Logging System`})
 
    return send_log(role.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging role delete')
    }
 
 
    });

    client.on("guildBanAdd", ({guild, user}) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('User Banned')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${user}`})
            .addFields({ name: `Member ID`, value: `${user.id}`})
            .addFields({ name: `Member Tag`, value: `${user.tag}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging ban add')
    }
 
    });

    client.on("guildBanRemove", ({guild, user}) => {
 
        try {
 
        if (guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('User Unbanned')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Member`, value: `${user}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(guild.id, embed);
 
    } catch (err) {
        console.log('Err logging ban remove')
    }
 
    });

    client.on("channelCreate", (channel) => {
 
        try {
 
        if (channel.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Channel Created')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Channel`, value: `${channel}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(channel.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging channel create')
    }
 
    });

    client.on("channelDelete", (channel) => {
 
        try {
 
        if (channel.guild === null) return;
 
        const embed = new EmbedBuilder()
            .setTitle('Channel Deleted')
            .setColor('#2f3136')
            .setTimestamp()
            .addFields({ name: `Channel`, value: `${channel}`})
            .setFooter({ text: `Logging System`})
 
        return send_log(channel.guild.id, embed);
 
    } catch (err) {
        console.log('Err logging channel delete')
    }
 
    });
}
 
module.exports = { logging };