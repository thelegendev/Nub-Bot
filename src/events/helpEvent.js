const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ComponentType } = require('discord.js');
 
module.exports = {
name: "interactionCreate",
 
async execute(interaction) {
 
    const helprow2 = new ActionRowBuilder()
        .addComponents(
 
            new StringSelectMenuBuilder()
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId('selecthelp')
            .setPlaceholder('Select a menu')
            .addOptions(
                {
                    label: 'Help Centre',
                    description: 'Navigate to the Help Centre.',
                    value: 'helpcentre',
                },
 
                {
                    label: 'Commands',
                    description: 'Navigate to the Commands page.',
                    value: 'commands',
                },
            ),
        );
 
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId === 'selecthelp') {
        let choices = "";
        
        const centerembed = new EmbedBuilder()
        .setColor('#2f3136')
        .setDescription(`**Nub Bot** offers a multitude of diversified features to enchance the experience for you and your server. Listed down below are some of the features that the bot provides. \n\n <:icon1:1100723889098735679> :busts_in_silhouette: **General** \n <:icon2:1100724446525935616> :shield: **Moderation** \n <:icon2:1100724446525935616> :star_struck: **Fun** \n <:icon2:1100724446525935616> :video_game: **Minigame** \n <:icon2:1100724446525935616> :moneybag: **Economy** \n <:icon2:1100724446525935616> :tools: **Utility** \n <:icon2:1100724446525935616> :information_source: **Information** \n <:icon2:1100724446525935616> :arrow_double_up: **Level** \n <:icon3:1100724523281694781> :gear: **Miscellaneous**`)
        .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')
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
            .setURL("https://discord.com/api/oauth2/authorize?client_id=861922247974977536&permissions=8&scope=bot%20applications.commands")
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
                .addFields({ name: `<:icon4:1100728456448323595> /afk`, value: `<:icon3:1100724523281694781> Go AFK within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /calculator`, value: `<:icon3:1100724523281694781> Use a realistic calculator.` })
                .addFields({ name: `<:icon4:1100728456448323595> /dictionary`, value: `<:icon3:1100724523281694781> Search any word in the dictionary.` })
                .addFields({ name: `<:icon4:1100728456448323595> /giveaway`, value: `<:icon3:1100724523281694781> Configure your giveaway(s).` })
                .addFields({ name: `<:icon4:1100728456448323595> /google`, value: `<:icon3:1100724523281694781> Search anything on Google.` })
                .addFields({ name: `<:icon4:1100728456448323595> /invites`, value: `<:icon3:1100724523281694781> Shows an user's invite count within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /lyrics`, value: `<:icon3:1100724523281694781> Get lyrics for any song.` })
                .addFields({ name: `<:icon4:1100728456448323595> /nitro`, value: `<:icon3:1100724523281694781> Generates a nitro link.` })
                .addFields({ name: `<:icon4:1100728456448323595> /reminder`, value: `<:icon3:1100724523281694781> Configure your reminders.` })
                .addFields({ name: `<:icon4:1100728456448323595> /translate`, value: `<:icon3:1100724523281694781> Translate your message to a different language.` })
                .addFields({ name: `<:icon4:1100728456448323595> /warnings`, value: `<:icon3:1100724523281694781> Shows an user's warnings within the server.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')
 
                const commandpage2 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':shield: **__Moderation__**')
                .addFields({ name: `<:icon4:1100728456448323595> /automod`, value: `<:icon3:1100724523281694781> Setup the automod system.` })
                .addFields({ name: `<:icon4:1100728456448323595> /ban`, value: `<:icon3:1100724523281694781> Ban an user from the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /clear-warn`, value: `<:icon3:1100724523281694781> Clear an user's warnings.` })
                .addFields({ name: `<:icon4:1100728456448323595> /invite-logger`, value: `<:icon3:1100724523281694781> Setup the invite logger system.` })
                .addFields({ name: `<:icon4:1100728456448323595> /kick`, value: `<:icon3:1100724523281694781> Kick an user from the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /lock`, value: `<:icon3:1100724523281694781> Lock the specified channel.` })
                .addFields({ name: `<:icon4:1100728456448323595> /logs`, value: `<:icon3:1100724523281694781> Configure the logging system.` })
                .addFields({ name: `<:icon4:1100728456448323595> /mute`, value: `<:icon3:1100724523281694781> Time out an user within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /purge`, value: `<:icon3:1100724523281694781> Clear messages from an user.` })
                .addFields({ name: `<:icon4:1100728456448323595> /role`, value: `<:icon3:1100724523281694781> Configure roles within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /unban-all`, value: `<:icon3:1100724523281694781> Unban all users in the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /unban`, value: `<:icon3:1100724523281694781> Unban an user in the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /unlock`, value: `<:icon3:1100724523281694781> Unlock the specified channel.` })
                .addFields({ name: `<:icon4:1100728456448323595> /unmute`, value: `<:icon3:1100724523281694781> Untime out an user within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /verify`, value: `<:icon3:1100724523281694781> Configure the verification system.` })
                .addFields({ name: `<:icon4:1100728456448323595> /warn`, value: `<:icon3:1100724523281694781> Warn an user within the server.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage3 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':star_struck: **__Fun__**')
                .addFields({ name: `<:icon4:1100728456448323595> /8ball`, value: `<:icon3:1100724523281694781> Play the 8ball game.` })
                .addFields({ name: `<:icon4:1100728456448323595> /advice`, value: `<:icon3:1100724523281694781> Get some advice.` })
                .addFields({ name: `<:icon4:1100728456448323595> /ascii`, value: `<:icon3:1100724523281694781> Converts given text to ascii.` })
                .addFields({ name: `<:icon4:1100728456448323595> /coin-flip`, value: `<:icon3:1100724523281694781> Flip a coin.` })
                .addFields({ name: `<:icon4:1100728456448323595> /dice`, value: `<:icon3:1100724523281694781> Roll a dice.` })
                .addFields({ name: `<:icon4:1100728456448323595> /find-game`, value: `<:icon3:1100724523281694781> Find a game you can enjoy.` })
                .addFields({ name: `<:icon4:1100728456448323595> /hack`, value: `<:icon3:1100724523281694781> Hack the mentioned user.` })
                .addFields({ name: `<:icon4:1100728456448323595> /how-gae`, value: `<:icon3:1100724523281694781> Results are accurate, no questions asked.` })
                .addFields({ name: `<:icon4:1100728456448323595> /husbando`, value: `<:icon3:1100724523281694781> Get a random husbando image.` })
                .addFields({ name: `<:icon4:1100728456448323595> /impersonate`, value: `<:icon3:1100724523281694781> Impersonate an user with a webhook.` })
                .addFields({ name: `<:icon4:1100728456448323595> /meme`, value: `<:icon3:1100724523281694781> Get a meme` })
                .addFields({ name: `<:icon4:1100728456448323595> /pp`, value: `<:icon3:1100724523281694781> Better not talk about it.` })
                .addFields({ name: `<:icon4:1100728456448323595> /sound-board`, value: `<:icon3:1100724523281694781> Play the specified sound in vc.` })
                .addFields({ name: `<:icon4:1100728456448323595> /waifu`, value: `<:icon3:1100724523281694781> Get a random waifu image.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage4 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':video_game: **__Minigame__**')
                .addFields({ name: `<:icon4:1100728456448323595> /2048`, value: `<:icon3:1100724523281694781> Play a game of 2048.` })
                .addFields({ name: `<:icon4:1100728456448323595> /connect-four`, value: `<:icon3:1100724523281694781> Play a game of connect four.` })
                .addFields({ name: `<:icon4:1100728456448323595> /fast-type`, value: `<:icon3:1100724523281694781> Play a game of fast type.` })
                .addFields({ name: `<:icon4:1100728456448323595> /find-emoji`, value: `<:icon3:1100724523281694781> Play a game of find emoji.` })
                .addFields({ name: `<:icon4:1100728456448323595> /flood`, value: `<:icon3:1100724523281694781> Play a game of flood.` })
                .addFields({ name: `<:icon4:1100728456448323595> /guess-the-pokemon`, value: `<:icon3:1100724523281694781> Play a game of guess the pokemon.` })
                .addFields({ name: `<:icon4:1100728456448323595> /gunfight`, value: `<:icon3:1100724523281694781> Play a game of cowboy.` })
                .addFields({ name: `<:icon4:1100728456448323595> /hangman`, value: `<:icon3:1100724523281694781> Play a game of hangman.` })
                .addFields({ name: `<:icon4:1100728456448323595> /match-pairs`, value: `<:icon3:1100724523281694781> Play a game of match pairs.` })
                .addFields({ name: `<:icon4:1100728456448323595> /minesweeper`, value: `<:icon3:1100724523281694781> Play a game of minesweeper.` })
                .addFields({ name: `<:icon4:1100728456448323595> /rps`, value: `<:icon3:1100724523281694781> Play a game of rock paper scissors.` })
                .addFields({ name: `<:icon4:1100728456448323595> /slots`, value: `<:icon3:1100724523281694781> Play a game of slots.` })
                .addFields({ name: `<:icon4:1100728456448323595> /snake`, value: `<:icon3:1100724523281694781> Play a game of snake.` })
                .addFields({ name: `<:icon4:1100728456448323595> /ttt`, value: `<:icon3:1100724523281694781> Play a game of tic tac toe.` })
                .addFields({ name: `<:icon4:1100728456448323595> /wordle`, value: `<:icon3:1100724523281694781> Play a game of wordle.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage5 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':moneybag: **__Economy__**')
                .addFields({ name: `<:icon4:1100728456448323595> /beg`, value: `<:icon3:1100724523281694781> Beg to get money.` })
                .addFields({ name: `<:icon4:1100728456448323595> /daily`, value: `<:icon3:1100724523281694781> Claim your daily boost.` })
                .addFields({ name: `<:icon4:1100728456448323595> /deposit`, value: `<:icon3:1100724523281694781> Deposit money from your wallet to bank.` })
                .addFields({ name: `<:icon4:1100728456448323595> /economy-account`, value: `<:icon3:1100724523281694781> View your economy account balance and info.` })
                .addFields({ name: `<:icon4:1100728456448323595> /economy-create`, value: `<:icon3:1100724523281694781> Create an economy account.` })
                .addFields({ name: `<:icon4:1100728456448323595> /economy-delete`, value: `<:icon3:1100724523281694781> Delete an economy account.` })
                .addFields({ name: `<:icon4:1100728456448323595> /gamble`, value: `<:icon3:1100724523281694781> Gamble to win or lose money.` })
                .addFields({ name: `<:icon4:1100728456448323595> /withdraw`, value: `<:icon3:1100724523281694781> Withdraw money from your bank to wallet.` })
                .addFields({ name: `<:icon4:1100728456448323595> /work`, value: `<:icon3:1100724523281694781> Work to earn money.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage6 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':tools: **__Utility__**')
                .addFields({ name: `<:icon4:1100728456448323595> /add-emoji`, value: `<:icon3:1100724523281694781> Specified emoji will be added to the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /add-sticker`, value: `<:icon3:1100724523281694781> Specified file will be added as a sticker in the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /echo`, value: `<:icon3:1100724523281694781> Send something to the specified channel.` })
                .addFields({ name: `<:icon4:1100728456448323595> /enlarge`, value: `<:icon3:1100724523281694781> Make an emoji bigger.` })
                .addFields({ name: `<:icon4:1100728456448323595> /poll`, value: `<:icon3:1100724523281694781> Host a poll for all users to vote for.` })
                .addFields({ name: `<:icon4:1100728456448323595> /react-role`, value: `<:icon3:1100724523281694781> Setup a reaction role system in the specified channel.` })
                .addFields({ name: `<:icon4:1100728456448323595> /steal`, value: `<:icon3:1100724523281694781> Add the specified emoji to the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /tts`, value: `<:icon3:1100724523281694781> Send a text to speech message.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage7 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':information_source: **__Information__**')
                .addFields({ name: `<:icon4:1100728456448323595> /bot-stats`, value: `<:icon3:1100724523281694781> Receive some statistics about the bot.` })
                .addFields({ name: `<:icon4:1100728456448323595> /role-info`, value: `<:icon3:1100724523281694781> Receive information about a role in the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /server-info`, value: `<:icon3:1100724523281694781> Receive information about the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /user-info`, value: `<:icon3:1100724523281694781> Receive information about an user in the server.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage8 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':arrow_double_up: **__Level__**')
                .addFields({ name: `<:icon4:1100728456448323595> /rank`, value: `<:icon3:1100724523281694781> Check an user's level/rank within the server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /xp-leaderboard`, value: `<:icon3:1100724523281694781> Check the server's xp leaderboard.` })
                .addFields({ name: `<:icon4:1100728456448323595> /xp-reset`, value: `<:icon3:1100724523281694781> Reset all of the server user's xp & levels.` })
                .addFields({ name: `<:icon4:1100728456448323595> /xpuser-reset`, value: `<:icon3:1100724523281694781> Reset an user's xp & rank.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage9 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':gear: **__Miscellaneous__**')
                .addFields({ name: `<:icon4:1100728456448323595> /help`, value: `<:icon3:1100724523281694781> Learn more regarding the bot and it's features.` })
                .addFields({ name: `<:icon4:1100728456448323595> /ping`, value: `<:icon3:1100724523281694781> Check the bot's latency.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')

                const commandpage10 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle(':man_technologist: **__Developer__**')
                .addFields({ name: `<:icon4:1100728456448323595> /leave-server`, value: `<:icon3:1100724523281694781> Make the bot leave a server.` })
                .addFields({ name: `<:icon4:1100728456448323595> /server-list`, value: `<:icon3:1100724523281694781> Shows all the servers the bot is currently in.` })
                .addFields({ name: `<:icon4:1100728456448323595> /shutdown`, value: `<:icon3:1100724523281694781> Shuts down the bot.` })
                .setThumbnail('https://cdn.discordapp.com/icons/999278158706647070/44a365242aef5b3b0b178cb782207729.webp?size=1024')
 
                const commandbuttons1 = new ActionRowBuilder()
                .addComponents(
 
                    new ButtonBuilder()
                    .setCustomId('first1')
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
                    .setLabel('1/10')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Secondary),
 
                    new ButtonBuilder()
                    .setCustomId('pageright1')
                    .setLabel('▶')
                    .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                    .setCustomId('last1')
                    .setLabel('▶▶')
                    .setDisabled(false)
                    .setStyle(ButtonStyle.Primary)
                )
 
                const commandbuttons2 = new ActionRowBuilder()
                    .addComponents(
 
                        new ButtonBuilder()
                        .setCustomId('first2')
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
                        .setLabel('2/10')
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
 
                        new ButtonBuilder()
                        .setCustomId('pageright2')
                        .setDisabled(false)
                        .setLabel('▶')
                        .setStyle(ButtonStyle.Primary),

                        new ButtonBuilder()
                        .setCustomId('last2')
                        .setLabel('▶▶')
                        .setDisabled(false)
                        .setStyle(ButtonStyle.Primary)
                    )

                const commandbuttons3 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first3')
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
                      .setLabel('3/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright3')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last3')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    )
                    
                    const commandbuttons4 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first4')
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
                      .setLabel('4/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright4')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last4')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons5 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first5')
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
                      .setLabel('5/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright5')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last5')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons6 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first6')
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
                      .setLabel('6/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright6')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('last6')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons7 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first7')
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
                      .setLabel('7/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright7')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last7')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons8 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first8')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft8')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer8')
                      .setLabel('8/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright8')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last8')
                      .setLabel('▶▶')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons9 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first9')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft9')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer9')
                      .setLabel('9/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright9')
                      .setDisabled(false)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last9')
                      .setLabel('▶▶')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Primary)
                    ) 

                    const commandbuttons10 = new ActionRowBuilder()
                    .addComponents(

                      new ButtonBuilder()
                      .setCustomId('first10')
                      .setLabel('◀◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('pageleft10')
                      .setLabel('◀')
                      .setDisabled(false)
                      .setStyle(ButtonStyle.Primary),
                      
                      new ButtonBuilder()
                      .setCustomId('spacer10')
                      .setLabel('10/10')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Secondary),

                      new ButtonBuilder()
                      .setCustomId('pageright10')
                      .setDisabled(true)
                      .setLabel('▶')
                      .setStyle(ButtonStyle.Primary),

                      new ButtonBuilder()
                      .setCustomId('last10')
                      .setLabel('▶▶')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Primary)
                    ) 
 
                interaction.update({ embeds: [commandpage1], components: [commandbuttons1] });
                const commandsmessage = interaction.message;
                const collector = commandsmessage.createMessageComponentCollector({ componentType: ComponentType.Button });
 
                collector.on('collect', async i => {
            
                    if (i.customId === 'spacer10') {
                        
                        return;
                
                    }
                
                    if (i.customId === 'first1') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                  }
                    
                    if (i.customId === 'pageleft1') {
                
                        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
                
                    }
                
                    if (i.customId === 'pageright1') {
                
                        await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
                
                    }

                    if (i.customId === 'last1') {
                
                      await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
              
                    }

                    if (i.customId === 'first2') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                  }

                    if (i.customId === 'pageleft2') {
                
                      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
              
                    }
                
                    if (i.customId === 'pageright2') {
                
                        await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
                
                    }

                    if (i.customId === 'last2') {
                
                      await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
              
                    }

                  if (i.customId === 'first3') {
                
                    await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
            
                }

                  if (i.customId === 'pageleft3') {
              
                    await i.update({ embeds: [commandpage2], components: [commandbuttons2] });
            
                  }
              
                  if (i.customId === 'pageright3') {
              
                      await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
              
                  }

                  if (i.customId === 'last3') {
                
                    await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
            
                  }
                
                if (i.customId === 'first4') {
                
                  await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
          
              }

                if (i.customId === 'pageleft4') {
            
                  await i.update({ embeds: [commandpage3], components: [commandbuttons3] });
          
                }
            
                if (i.customId === 'pageright4') {
            
                    await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
            
                }

                if (i.customId === 'last4') {
                
                  await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
          
                }

              if (i.customId === 'first5') {
                
                await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
        
            }

              if (i.customId === 'pageleft5') {
          
                await i.update({ embeds: [commandpage4], components: [commandbuttons4] });
        
              }
          
              if (i.customId === 'pageright5') {
          
                  await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
          
              }

              if (i.customId === 'last5') {
                
                await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
        
              }

            if (i.customId === 'first6') {
                
              await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
      
          }

            if (i.customId === 'pageleft6') {
        
              await i.update({ embeds: [commandpage5], components: [commandbuttons5] });
      
            }
        
            if (i.customId === 'pageright6') {
        
                await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
        
            }

            if (i.customId === 'last6') {
                
              await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
      
            }

          if (i.customId === 'first7') {
                
            await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
    
        }

          if (i.customId === 'pageleft7') {
      
            await i.update({ embeds: [commandpage6], components: [commandbuttons6] });
    
          }
      
          if (i.customId === 'pageright7') {
      
              await i.update({ embeds: [commandpage8], components: [commandbuttons8] });
      
          }

          if (i.customId === 'last7') {
                
            await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
    
          }

        if (i.customId === 'first8') {
                
          await i.update({ embeds: [commandpage1], components: [commandbuttons1] });
  
      }

        if (i.customId === 'pageleft8') {
    
          await i.update({ embeds: [commandpage7], components: [commandbuttons7] });
  
        }
    
        if (i.customId === 'pageright8') {
    
            await i.update({ embeds: [commandpage9], components: [commandbuttons9] });
    
        }

        if (i.customId === 'last8') {
                
          await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
  
        }

      if (i.customId === 'first9') {
                
        await i.update({ embeds: [commandpage1], components: [commandbuttons1] });

    }

      if (i.customId === 'pageleft9') {
  
        await i.update({ embeds: [commandpage8], components: [commandbuttons8] });

      }
  
      if (i.customId === 'pageright9') {
  
          await i.update({ embeds: [commandpage10], components: [commandbuttons10] });
  
      }

      if (i.customId === 'last9') {
                
        await i.update({ embeds: [commandpage10], components: [commandbuttons10] });

      }

    if (i.customId === 'first10') {
                
      await i.update({ embeds: [commandpage1], components: [commandbuttons1] });

  }

    if (i.customId === 'pageleft10') {

      await i.update({ embeds: [commandpage9], components: [commandbuttons9] });

    }

    if (i.customId === 'pageright10') {

        await i.update({ embeds: [commandpage10], components: [commandbuttons10] });

    }

    if (i.customId === 'last10') {
                
      await i.update({ embeds: [commandpage10], components: [commandbuttons10] });

    }


                })
            }
        })
    }
}
}