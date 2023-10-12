const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ModalBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, Collection } = require(`discord.js`);
const fs = require('fs');
const { Events }  = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] });
const Logs = require('discord-logs');
const GiveawaysManager = require("./events/giveaway");

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

client.giveawayManager = new GiveawaysManager(client, {
    default: {
      botsCanWin: false,
      embedColor: "#a200ff",
      embedColorEnd: "#550485",
      reaction: "<a:tada:1160826950386995300>",
    },
});

const process = require('node:process');

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.log("Uncaught Exception:", err);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log("Uncaught Exception Monitor:", err, origin);
});

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    };
})();

client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");

Logs(client, {
    debug: true
});

const {logging} = require("./events/logging");

client.login(process.env.TOKEN).then(() => {
    logging(client);
});
 

// CAPTCHA VERIFICATION SYSTEM

const verifySchema = require('./schemas/verify');
const captchaSchema = require('./schemas/captcha');
const { CaptchaGenerator } = require('captcha-canvas');
 
client.on(Events.InteractionCreate, async (interaction) => {
 
    if (interaction.guild === null) return;
 
    const verifydata = await verifySchema.findOne({ Guild: interaction.guild.id });
    const captchadata = await captchaSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
 
    if (interaction.customId === 'verify') {
 
        if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true});
 
        if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true})
        else {
 
            let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
            let result = Math.floor(Math.random() * letter.length);
            let result2 = Math.floor(Math.random() * letter.length);
            let result3 = Math.floor(Math.random() * letter.length);
            let result4 = Math.floor(Math.random() * letter.length);
            let result5 = Math.floor(Math.random() * letter.length);
 
            const captchacode = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
            console.log(captchacode)
 
            const captcha = new CaptchaGenerator()
            .setDimension(150, 450)
            .setCaptcha({ text: `${captchacode}`, size: 60, color: "red"})
            .setDecoy({ opacity: 0.5 })
            .setTrace({ color: "red" })
 
            const buffer = captcha.generateSync();
 
            const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
 
            const verifyembed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Verification Process`})
            .setFooter({ text: `Verification Captcha`})
            .setTimestamp()
            .setImage('attachment://captcha.png')
            .setTitle('Verification Step: Captcha')
            .addFields({ name: `Verify`, value: 'Please use the button below to \n> submit your captcha!'})
 
            const verifybutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('⚠️ Enter Captcha')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('captchaenter')
            )
 
            const vermodal = new ModalBuilder()
            .setTitle('Verification')
            .setCustomId('vermodal')
 
            const answer = new TextInputBuilder()
            .setCustomId('answer')
            .setRequired(true)
            .setLabel('Please sumbit your Captcha code')
            .setPlaceholder('Your captcha code')
            .setStyle(TextInputStyle.Short)
 
            const vermodalrow = new ActionRowBuilder().addComponents(answer);
            vermodal.addComponents(vermodalrow);
 
            const vermsg = await interaction.reply({ embeds: [verifyembed], components: [verifybutton], ephemeral: true, files: [verifyattachment] });
 
            const vercollector = vermsg.createMessageComponentCollector();
 
            vercollector.on('collect', async i => {
 
                if (i.customId === 'captchaenter') {
                    i.showModal(vermodal);
                }
 
            })
 
            if (captchadata) {
 
                await captchaSchema.deleteMany({
                    Guild: interaction.guild.id,
                    User: interaction.user.id
                })
 
                await captchaSchema.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: captchacode
                })
 
            } else {
 
                await captchaSchema.create ({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Key: captchacode
                })
 
            }
        } 
    }
})
 
client.on(Events.InteractionCreate, async (interaction) => {
 
    if (!interaction.isModalSubmit()) return;
 
    if (interaction.customId === 'vermodal') {
 
        const userverdata = await captchaSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
        const verificationdata = await verifySchema.findOne({ Guild: interaction.guild.id });
 
        if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `You are **already** verified within this server!`, ephemeral: true});
 
        const modalanswer = interaction.fields.getTextInputValue('answer');
        if (modalanswer === userverdata.Key) {
 
            const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);
 
            try {
                await interaction.member.roles.add(verrole);
            } catch (err) {
                return await interaction.reply({ content: `There was an **issue** assigning you the **<@&${verificationdata.Role}>** role, try again later!`, ephemeral: true})
            }
 
            await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
            await verifySchema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
 
        } else {
            await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
        }
    }
})

// AFK SYSTEM
 
const afkSchema = require('./schemas/afk');
 
client.on(Events.MessageCreate, async (message) => {
 
    if (message.author.bot) return;
 
    const afkcheck = await afkSchema.findOne({ Guild: message.guild.id, User: message.author.id});
    if (afkcheck) {
        const nick = afkcheck.Nickname;
 
        await afkSchema.deleteMany({
            Guild: message.guild.id,
            User: message.author.id
        })
 
        await message.member.setNickname(`${nick}`).catch(Err => {
            return;
        })
 
        const m1 = await message.reply({ content: `Hey, you are **back**!`, ephemeral: true})
        setTimeout(() => {
            m1.delete();
        }, 4000)
    } else {
 
        const members = message.mentions.users.first();
        if (!members) return;
        const afkData = await afkSchema.findOne({ Guild: message.guild.id, User: members.id })
 
        if (!afkData) return;
 
        const member = message.guild.members.cache.get(members.id);
        const msg = afkData.Message;
 
        if (message.content.includes(members)) {
            const m = await message.reply({ content: `${member.user.tag} is currently AFK, let's keep it down... \n> **Reason**: ${msg}`, ephemeral: true});
            setTimeout(() => {
                m.delete();
                message.delete();
            }, 4000)
        }
    }
})

// REMINDER SYSTEM

const reminderSchema = require('./schemas/reminder');
setInterval(async () => {

    const reminders = await reminderSchema.find();
    if (!reminders) return;
    else {

        reminders.forEach(async (reminder) => {

            if (reminder.Time > Date.now()) return;

            const user = await client.users.fetch(reminder.User);
            
            user?.send({
                content: `you asked me to remind you about \`${reminder.Remind}\``
            }).catch(err => {return;});

            await reminderSchema.deleteMany({
                Time: reminder.Time,
                User: user.id,
                Remind: reminder.Remind
            });

        })
    }

}, 1000 * 5);

// COMMAND LOGGING SYSTEM

client.on(Events.InteractionCreate, async interaction => {

    if(!interaction) return;
    if(!interaction.isChatInputCommand()) return;

    else {
        const server = interaction.guild.name;
        const serverId = interaction.guild.id;
        const user = interaction.user.tag;
        const userId = interaction.user.id;

        console.log(`/${interaction.commandName} ---> ${user} (${userId}) ---> ${server} (${serverId})`)
    }
});

// POLL SYSTEM

const pollSchema = require('./schemas/poll');

client.on(Events.InteractionCreate, async (i) => {
 
    if (!i.guild) return;
    if (!i.message) return;
    if (!i.isButton) return;
 
    const data = await pollSchema.findOne({ Guild: i.guild.id, Msg: i.message.id });
    if (!data) return;
    const msg = await i.channel.messages.fetch(data.Msg)
 
        if (i.customId === 'up') {
 
            if (i.user.id === data.Owner) return await i.reply({ content: `❌ You **cannot** upvote your own **poll**!`, ephemeral: true });
            if (data.UpMembers.includes(i.user.id)) return await i.reply({ content: `❌ You have **already** upvoted this **poll**`, ephemeral: true});
 
            let downvotes = data.Downvote;
            if (data.DownMembers.includes(i.user.id)) {
                downvotes = downvotes - 1;
            }
 
            const newembed = EmbedBuilder.from(msg.embeds[0]).setFields({ name: `Upvotes`, value: `**${data.Upvote + 1}** Votes`, inline: true}, { name: `Downvotes`, value: `**${downvotes}** Votes`, inline: true}, { name: `Author`, value: `<@${data.Owner}>`});
 
            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('up')
                .setEmoji('✅')
                .setLabel(`${data.Upvote + 1}`)
                .setStyle(ButtonStyle.Secondary),
 
                new ButtonBuilder()
                .setCustomId('down')
                .setEmoji('❌')
                .setLabel(`${downvotes}`)
                .setStyle(ButtonStyle.Secondary),
 
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel('Votes')
                .setStyle(ButtonStyle.Secondary)
            )
 
            await i.update({ embeds: [newembed], components: [buttons] })
 
            data.Upvote++
 
            if (data.DownMembers.includes(i.user.id)) {
                data.Downvote = data.Downvote - 1;
            }
 
            data.UpMembers.push(i.user.id)
            data.DownMembers.pull(i.user.id)
            data.save();
 
        }
 
        if (i.customId === 'down') {
 
            if (i.user.id === data.Owner) return await i.reply({ content: `❌ You **cannot** downvote your own **poll**!`, ephemeral: true });
            if (data.DownMembers.includes(i.user.id)) return await i.reply({ content: `❌ You have **already** downvoted this **poll**`, ephemeral: true});
 
            let upvotes = data.Upvote;
            if (data.UpMembers.includes(i.user.id)) {
                upvotes = upvotes - 1;
            }
 
            const newembed = EmbedBuilder.from(msg.embeds[0]).setFields({ name: `Upvotes`, value: `**${upvotes}** Votes`, inline: true}, { name: `Downvotes`, value: `**${data.Downvote + 1}** Votes`, inline: true}, { name: `Author`, value: `<@${data.Owner}>`});
 
            const buttons = new ActionRowBuilder()
            .addComponents(
 
                new ButtonBuilder()
                .setCustomId('up')
                .setEmoji('✅')
                .setLabel(`${upvotes}`)
                .setStyle(ButtonStyle.Secondary),
 
                new ButtonBuilder()
                .setCustomId('down')
                .setEmoji('❌')
                .setLabel(`${data.Downvote + 1}`)
                .setStyle(ButtonStyle.Secondary),
 
                new ButtonBuilder()
                .setCustomId('votes')
                .setLabel('Votes')
                .setStyle(ButtonStyle.Secondary)
            )
 
            await i.update({ embeds: [newembed], components: [buttons] })
 
            data.Downvote++
 
            if (data.UpMembers.includes(i.user.id)) {
                data.Upvote = data.Upvote - 1;
            }
 
            data.DownMembers.push(i.user.id);
            data.UpMembers.pull(i.user.id);
            data.save();
 
        }
 
        if (i.customId === 'votes') {
 
            let upvoters = [];
            await data.UpMembers.forEach(async member => {
                upvoters.push(`<@${member}>`)
            })
 
            let downvoters = [];
            await data.DownMembers.forEach(async member => {
                downvoters.push(`<@${member}>`)
            })
 
            const embed = new EmbedBuilder()
            .setTitle('Poll Votes')
            .setColor("#2f3136")
            .setAuthor({ name: `Poll System`})
            .setFooter({ text: `Poll Members`})
            .setTimestamp()
            .addFields({ name: `Upvoters (${upvoters.length})`, value: `${upvoters.join(', ').slice(0, 1020) || 'No upvoters'}`, inline: true})
            .addFields({ name: `Downvoters (${downvoters.length})`, value: `${downvoters.join(', ').slice(0, 1020) || 'No downvoters'}`, inline: true})
 
            await i.reply({ embeds: [embed], ephemeral: true })
        }
})
