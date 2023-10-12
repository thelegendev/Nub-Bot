const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
 
module.exports = {
name: "interactionCreate",

 /**
    * @param {ChatInputCommandInteraction} interaction 
    * @param {Client} client 
    */
 
async execute(interaction, client) {

    await client.user.fetch();
    await client.application.fetch();
 
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'selecthelp') {
        let choices = "";
        
        const centerembed = new EmbedBuilder()
        .setColor('#2f3136')
        .setDescription(`**Nub Bot** offers a multitude of diversified features to enhance the experience for you and your server. Listed down below are the features that the bot provides. \n\n <:icon1:1160823145893208166> :busts_in_silhouette: **General** \n <:icon2:1160823168945094716> :shield: **Moderation** \n <:icon2:1160823168945094716> :star_struck: **Fun** \n <:icon2:1160823168945094716> :video_game: **Minigame** \n <:icon2:1160823168945094716> :tools: **Utility** \n <:icon2:1160823168945094716> :information_source: **Information** \n <:icon3:1160823210439348275> :gear: **Miscellaneous**`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/URZnqtEbsQ"),

            new ButtonBuilder()
            .setLabel('Bot Invite')
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/api/oauth2/authorize?client_id=861922247974977536&permissions=1127297919033&scope=bot%20applications.commands"),

            new ButtonBuilder()
            .setLabel('Vote on Top.gg')
            .setStyle(ButtonStyle.Link)
            .setURL("https://top.gg/bot/861922247974977536/vote")
        )
 
        interaction.values.forEach(async (value) => {
            choices += `${value}`;
 
            if (value === 'helpcentre') {
 
                await interaction.update({ embeds: [centerembed, button] });
            }
 
            if (value === 'commands') {
 
                const commandpage1 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':busts_in_silhouette: **__General__**')
                .addFields({ name: `<:icon4:1160823233965207552> /afk`, value: `<:icon3:1160823210439348275> Go AFK within the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /calculator`, value: `<:icon3:1160823210439348275> Use a realistic calculator.` })
                .addFields({ name: `<:icon4:1160823233965207552> /dictionary`, value: `<:icon3:1160823210439348275> Search any word in the dictionary.` })
                .addFields({ name: `<:icon4:1160823233965207552> /giveaway`, value: `<:icon3:1160823210439348275> Configure your giveaway(s).` })
                .addFields({ name: `<:icon4:1160823233965207552> /invites`, value: `<:icon3:1160823210439348275> Shows a user's invite count within the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /lyrics`, value: `<:icon3:1160823210439348275> Get lyrics for any song.` })
                .addFields({ name: `<:icon4:1160823233965207552> /reminder`, value: `<:icon3:1160823210439348275> Configure your reminders.` })
                .addFields({ name: `<:icon4:1160823233965207552> /translate`, value: `<:icon3:1160823210439348275> Translate your message to a different language.` })
                .addFields({ name: `<:icon4:1160823233965207552> /warnings`, value: `<:icon3:1160823210439348275> Shows a user's warnings within the server.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
 
                const commandpage2 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':shield: **__Moderation__**')
                .addFields({ name: `<:icon4:1160823233965207552> /automod`, value: `<:icon3:1160823210439348275> Configure the automod system.` })
                .addFields({ name: `<:icon4:1160823233965207552> /ban`, value: `<:icon3:1160823210439348275> Ban a user from the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /clear-warn`, value: `<:icon3:1160823210439348275> Clear a user's warnings.` })
                .addFields({ name: `<:icon4:1160823233965207552> /kick`, value: `<:icon3:1160823210439348275> Kick a user from the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /lock`, value: `<:icon3:1160823210439348275> Lock the specified channel.` })
                .addFields({ name: `<:icon4:1160823233965207552> /logs`, value: `<:icon3:1160823210439348275> Configure the logging system.` })
                .addFields({ name: `<:icon4:1160823233965207552> /mod-name`, value: `<:icon3:1160823210439348275> Moderate a user's nickname.` })
                .addFields({ name: `<:icon4:1160823233965207552> /mute`, value: `<:icon3:1160823210439348275> Time out a user within the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /purge`, value: `<:icon3:1160823210439348275> Clear messages from a user.` })
                .addFields({ name: `<:icon4:1160823233965207552> /role`, value: `<:icon3:1160823210439348275> Configure roles within the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /unban`, value: `<:icon3:1160823210439348275> Unban a user in the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /unlock`, value: `<:icon3:1160823210439348275> Unlock the specified channel.` })
                .addFields({ name: `<:icon4:1160823233965207552> /unmute`, value: `<:icon3:1160823210439348275> Untime out a user within the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /verify`, value: `<:icon3:1160823210439348275> Configure the verification system.` })
                .addFields({ name: `<:icon4:1160823233965207552> /warn`, value: `<:icon3:1160823210439348275> Warn a user within the server.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandpage3 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':star_struck: **__Fun__**')
                .addFields({ name: `<:icon4:1160823233965207552> /8ball`, value: `<:icon3:1160823210439348275> Play the 8ball game.` })
                .addFields({ name: `<:icon4:1160823233965207552> /advice`, value: `<:icon3:1160823210439348275> Get some random advice.` })
                .addFields({ name: `<:icon4:1160823233965207552> /ascii`, value: `<:icon3:1160823210439348275> Converts given text to ascii.` })
                .addFields({ name: `<:icon4:1160823233965207552> /bonk`, value: `<:icon3:1160823210439348275> Bonk a user.` })
                .addFields({ name: `<:icon4:1160823233965207552> /coin-flip`, value: `<:icon3:1160823210439348275> Flip a coin.` })
                .addFields({ name: `<:icon4:1160823233965207552> /dice`, value: `<:icon3:1160823210439348275> Roll a dice.` })
                .addFields({ name: `<:icon4:1160823233965207552> /find-game`, value: `<:icon3:1160823210439348275> Find a game you can enjoy.` })
                .addFields({ name: `<:icon4:1160823233965207552> /hack`, value: `<:icon3:1160823210439348275> Hack the mentioned user.` })
                .addFields({ name: `<:icon4:1160823233965207552> /how-gae`, value: `<:icon3:1160823210439348275> Results are accurate, no questions asked.` })
                .addFields({ name: `<:icon4:1160823233965207552> /husbando`, value: `<:icon3:1160823210439348275> Generate a random husbando image.` })
                .addFields({ name: `<:icon4:1160823233965207552> /impersonate`, value: `<:icon3:1160823210439348275> Impersonate a user with a webhook.` })
                .addFields({ name: `<:icon4:1160823233965207552> /meme`, value: `<:icon3:1160823210439348275> Generate a random meme.` })
                .addFields({ name: `<:icon4:1160823233965207552> /nitro`, value: `<:icon3:1160823210439348275> Sounds legit, doesn't it.` })
                .addFields({ name: `<:icon4:1160823233965207552> /pp`, value: `<:icon3:1160823210439348275> Let's not talk about it.` })
                .addFields({ name: `<:icon4:1160823233965207552> /radio`, value: `<:icon3:1160823210439348275> Hop in a radio station to vibe on music.` })
                .addFields({ name: `<:icon4:1160823233965207552> /sound-board`, value: `<:icon3:1160823210439348275> Play the specified sound in vc.` })
                .addFields({ name: `<:icon4:1160823233965207552> /waifu`, value: `<:icon3:1160823210439348275> Generate a random waifu image.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandpage4 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':video_game: **__Minigame__**')
                .addFields({ name: `<:icon4:1160823233965207552> /2048`, value: `<:icon3:1160823210439348275> Play a game of 2048.` })
                .addFields({ name: `<:icon4:1160823233965207552> /connect-four`, value: `<:icon3:1160823210439348275> Play a game of connect four.` })
                .addFields({ name: `<:icon4:1160823233965207552> /fast-type`, value: `<:icon3:1160823210439348275> Play a game of fast type.` })
                .addFields({ name: `<:icon4:1160823233965207552> /find-emoji`, value: `<:icon3:1160823210439348275> Play a game of find emoji.` })
                .addFields({ name: `<:icon4:1160823233965207552> /flood`, value: `<:icon3:1160823210439348275> Play a game of flood.` })
                .addFields({ name: `<:icon4:1160823233965207552> /guess-the-pokemon`, value: `<:icon3:1160823210439348275> Play a game of guess the pokemon.` })
                .addFields({ name: `<:icon4:1160823233965207552> /gunfight`, value: `<:icon3:1160823210439348275> Play a game of cowboy.` })
                .addFields({ name: `<:icon4:1160823233965207552> /hangman`, value: `<:icon3:1160823210439348275> Play a game of hangman.` })
                .addFields({ name: `<:icon4:1160823233965207552> /match-pairs`, value: `<:icon3:1160823210439348275> Play a game of match pairs.` })
                .addFields({ name: `<:icon4:1160823233965207552> /minesweeper`, value: `<:icon3:1160823210439348275> Play a game of minesweeper.` })
                .addFields({ name: `<:icon4:1160823233965207552> /rps`, value: `<:icon3:1160823210439348275> Play a game of rock paper scissors.` })
                .addFields({ name: `<:icon4:1160823233965207552> /slots`, value: `<:icon3:1160823210439348275> Play a game of slots.` })
                .addFields({ name: `<:icon4:1160823233965207552> /snake`, value: `<:icon3:1160823210439348275> Play a game of snake.` })
                .addFields({ name: `<:icon4:1160823233965207552> /ttt`, value: `<:icon3:1160823210439348275> Play a game of tic tac toe.` })
                .addFields({ name: `<:icon4:1160823233965207552> /wordle`, value: `<:icon3:1160823210439348275> Play a game of wordle.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandpage5 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':tools: **__Utility__**')
                .addFields({ name: `<:icon4:1160823233965207552> /add-emoji`, value: `<:icon3:1160823210439348275> Specified emoji will be added to the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /add-sticker`, value: `<:icon3:1160823210439348275> Specified file will be added as a sticker in the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /echo`, value: `<:icon3:1160823210439348275> Send something to the specified channel.` })
                .addFields({ name: `<:icon4:1160823233965207552> /enlarge`, value: `<:icon3:1160823210439348275> Make an emoji bigger.` })
                .addFields({ name: `<:icon4:1160823233965207552> /poll`, value: `<:icon3:1160823210439348275> Host a poll for all users to vote for.` })
                .addFields({ name: `<:icon4:1160823233965207552> /react-role`, value: `<:icon3:1160823210439348275> Setup a reaction role system in the specified channel.` })
                .addFields({ name: `<:icon4:1160823233965207552> /steal`, value: `<:icon3:1160823210439348275> Add the specified emoji to the server.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandpage6 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':information_source: **__Information__**')
                .addFields({ name: `<:icon4:1160823233965207552> /bot-info`, value: `<:icon3:1160823210439348275> Receive information regarding the bot.` })
                .addFields({ name: `<:icon4:1160823233965207552> /role-info`, value: `<:icon3:1160823210439348275> Receive information regarding a role in the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /server-info`, value: `<:icon3:1160823210439348275> Receive information regarding the server.` })
                .addFields({ name: `<:icon4:1160823233965207552> /user-info`, value: `<:icon3:1160823210439348275> Receive information regarding a user in the server.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandpage7 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':gear: **__Miscellaneous__**')
                .addFields({ name: `<:icon4:1160823233965207552> /help`, value: `<:icon3:1160823210439348275> Learn more regarding the bot and it's features.` })
                .addFields({ name: `<:icon4:1160823233965207552> /ping`, value: `<:icon3:1160823210439348275> Check the bot's latency.` })
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                const commandbuttons1 = new ActionRowBuilder()
                .addComponents(
 
                    new ButtonBuilder()
                    .setCustomId('pagefirst1')
                    .setLabel('◀◀')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary),
                    
                    new ButtonBuilder()
                    .setCustomId('pageleft1')
                    .setLabel('◀')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary), 
                    
                    new ButtonBuilder()
                    .setCustomId('spacer1')
                    .setLabel('1/7')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),
 
                    new ButtonBuilder()
                    .setCustomId('pageright1')
                    .setLabel('▶')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId('pagelast1')
                    .setLabel('▶▶')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Primary)
                )
 
                const commandbuttons2 = new ActionRowBuilder()
                    .addComponents(
 
                        new ButtonBuilder()
                        .setCustomId('pagefirst2')
                        .setLabel('◀◀')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Primary),
                        
                        new ButtonBuilder()
                        .setCustomId('pageleft2')
                        .setLabel('◀')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary),
                        
                        new ButtonBuilder()
                        .setCustomId('spacer2')
                        .setLabel('2/7')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
 
                        new ButtonBuilder()
                        .setCustomId('pageright2')
                        .setDisabled(false)
                        .setLabel('▶')
                        .setStyle(ButtonStyle.Primary),

                        new ButtonBuilder()
                        .setCustomId('pagelast2')
                        .setLabel('▶▶')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary)
                    )

                const commandbuttons3 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('pagefirst3')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('pageleft3')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer3')
                      .setLabel('3/7')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright3')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pagelast3')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    )
                    
                    const commandbuttons4 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('pagefirst4')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft4')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer4')
                      .setLabel('4/7')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright4')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pagelast4')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons5 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('pagefirst5')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft5')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer5')
                      .setLabel('5/7')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright5')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pagelast5')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons6 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('pagefirst6')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft6')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer6')
                      .setLabel('6/7')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright6')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('pagelast6')
                      .setLabel('▶▶')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons7 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('pagefirst7')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft7')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer7')
                      .setLabel('7/7')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright7')
                      .setDisabled(true)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pagelast7')
                      .setLabel('▶▶')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Primary)
                    )

 
                interaction.update({ embeds: [commandpage1], components: [commandbuttons1] });
                const commandsmessage = interaction.message;
                const collector = commandsmessage.createMessageComponentCollector({ componentType: ComponentType.Button });
 
                collector.on('collect', async i => {

                    if (i.user.id !== interaction.user.id) 
                    return i.reply({ content: `This button is not for you!`, ephemeral: true });
            
                    if (i.customId === 'spacer7') {
                        
                        return;
                
                    }
                
                    if (i.customId === 'pagefirst1') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                  }
                    
                    if (i.customId === 'pageleft1') {
                
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                
                    }
                
                    if (i.customId === 'pageright1') {
                
                        await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
                
                    }

                    if (i.customId === 'pagelast1') {
                
                      await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
              
                    }

                    if (i.customId === 'pagefirst2') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                  }

                    if (i.customId === 'pageleft2') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                    }
                
                    if (i.customId === 'pageright2') {
                
                        await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
                
                    }

                    if (i.customId === 'pagelast2') {
                
                      await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
              
                    }

                  if (i.customId === 'pagefirst3') {
                
                    await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
            
                }

                  if (i.customId === 'pageleft3') {
              
                    await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
            
                  }
              
                  if (i.customId === 'pageright3') {
              
                      await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
              
                  }

                  if (i.customId === 'pagelast3') {
                
                    await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
            
                  }
                
                if (i.customId === 'pagefirst4') {
                
                  await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
          
              }

                if (i.customId === 'pageleft4') {
            
                  await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
          
                }
            
                if (i.customId === 'pageright4') {
            
                    await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
            
                }

                if (i.customId === 'pagelast4') {
                
                  await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
          
                }

              if (i.customId === 'pagefirst5') {
                
                await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
        
            }

              if (i.customId === 'pageleft5') {
          
                await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
        
              }
          
              if (i.customId === 'pageright5') {
          
                  await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
          
              }

              if (i.customId === 'pagelast5') {
                
                await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
        
              }

            if (i.customId === 'pagefirst6') {
                
              await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
      
          }

            if (i.customId === 'pageleft6') {
        
              await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
      
            }
        
            if (i.customId === 'pageright6') {
        
                await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
        
            }

            if (i.customId === 'pagelast6') {
                
              await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
      
            }

          if (i.customId === 'pagefirst7') {
                
            await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
    
        }

          if (i.customId === 'pageleft7') {
      
            await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
    
          }
      
          if (i.customId === 'pageright7') {
      
              await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
      
          }

          if (i.customId === 'pagelast7') {
                
            await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
    
          }
                })
            }
        })
    }
}
}
