const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup the automod system.")
    .addSubcommand(command => command
        .setName("flagged-words")
        .setDescription("Block profanity, sexual content and slurs")

    )
    .addSubcommand(command => command
        .setName("spam-messages")
        .setDescription("Block messages suspected of spam")
        
    )
    .addSubcommand(command => command
        .setName("mention-spam")
        .setDescription("anti spam")
        .addIntegerOption(option => option
            .setName("number")
            .setDescription("The number of max mentions")
            .setRequired(true))
    )
    .addSubcommand(command => command
        .setName("keyword")
        .setDescription("Block a given keyword in the server")
        .addStringOption(option => option
            .setName("word")
            .setDescription("The word you want to block")
            .setRequired(true))
    ),
 
    async execute (interaction) {
        const { guild, options } = interaction;
        const sub = options.getSubcommand();
 
        const errEmbed = new EmbedBuilder()
        .setTitle("ERROR")
        .setColor("Red")
        .setDescription("Missing Permissions: Administrator")
        .setTimestamp()
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
            embeds: [errEmbed],
            ephemeral: true
        });
 
        switch (sub) {
            case "flagged-words":
 
            await interaction.reply({ content: `Loading your Automod rule...`});
 
            const rule = await guild.autoModerationRules.create({
                name: `Block profinity, sexual content and slurs by Nub Bot`,
                creatorId: '861922247974977536',
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata: 
                    {
                        presets: [1, 2, 3]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Nub Bot'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })
 
            setTimeout(async () => {
                if (!rule) return;
 
                const embed = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your automod rule has been created`)
 
                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                })
            }, 3000)
 
            break;
 
            case 'keyword':
 
            await interaction.reply({ content: `Loading your Automod rule...`});
            const word = options.getString("word");
 
            const rule2 = await guild.autoModerationRules.create({
                name: `Prevent the word ${word} by Nub Bot`,
                creatorId: '861922247974977536',
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata: 
                    {
                        keywordFilter: [`${word}`]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Nub Bot'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })
 
            setTimeout(async () => {
                if (!rule2) return;
 
                const embed2 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your automod rule has been created. Messages with **${word}** will be deleted`)
 
                await interaction.editReply({
                    content: ``,
                    embeds: [embed2]
                })
            }, 3000)
 
            break;
 
            case 'spam-messages':
 
            await interaction.reply({ content: `Loading your Automod rule...`}); 
 
            const rule3 = await guild.autoModerationRules.create({
                name: `Prevent spam messages by Nub Bot`,
                creatorId: '861922247974977536',
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetadata: 
                    {
                        //mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Nub Bot'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })
 
            setTimeout(async () => {
                if (!rule3) return;
 
                const embed3 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your automod rule has been created`)
 
                await interaction.editReply({
                    content: ``,
                    embeds: [embed3]
                })
            }, 3000)
 
            break;
 
            case 'mention-spam':

            await interaction.reply({ content: `Loading your Automod rule...`});
            const number = options.getInteger('number');
 
            const rule4 = await guild.autoModerationRules.create({
                name: `Prevent mention spam by Nub Bot`,
                creatorId: '861922247974977536',
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata: 
                    {
                        mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Nub Bot'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })
 
            setTimeout(async () => {
                if (!rule4) return;
 
                const embed4 = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Your automod rule has been created`)
 
                await interaction.editReply({
                    content: ``,
                    embeds: [embed4]
                })
            }, 3000)
 
            break;
 
        }
    }
}