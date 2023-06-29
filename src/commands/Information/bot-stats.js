const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits,EmbedBuilder,ChatInputCommandInteraction,Client, ChannelType,UserFlags,version } = require("discord.js");

const { connection } = require("mongoose");
const os = require("os");

module.exports = {

 data : new SlashCommandBuilder()
            .setName("bot-info")
            .setDescription("Receive information regarding the bot."),

 /**
    * @param {ChatInputCommandInteraction} interaction 
    * @param {Client} client 
    */

 async execute(interaction, client) {
    await interaction.deferReply()
    const status = [
    "Disconnected",
    "Connected",
    "Connecting",
    "Disconnecting"
    ];

       await client.user.fetch();
       await client.application.fetch();

       const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;

       const memoryUsed = (os.totalmem - os.freemem)/1000000000
       const memoryTotal = os.totalmem()/1000000000

       const days = Math.floor(client.uptime / 86400000)
       const hours = Math.floor(client.uptime / 3600000) % 24
       const minutes = Math.floor(client.uptime / 60000) % 60
       const seconds = Math.floor(client.uptime / 1000) % 60

       let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    await interaction.editReply({embeds: [

           new EmbedBuilder()

               .setColor("#2f3136")
               .setTitle(`Information & Statistics`)
               .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
               .setTimestamp()

               .addFields(

                   { name: "<:bot:1123907158359158854> Client", value: client.user.tag, inline: false },

                   { name: "<:developer:1123960341819301898> Developer", value: `${client.application.owner.tag || "None"}`, inline: false },

                   { name: ":calendar_spiral: Created", value: `06-07-2021`, inline: false },

                   { name: "<a:timer:1123960449914900603> Uptime", value: `${uptime}`, inline: false },

                   { name: "<:signal:1123960930661826620> Latency", value: `${client.ws.ping}ms`, inline: false },

                   { name:":bar_chart: Database", value: status[connection.readyState], inline: false },

                   { name: ":desktop: System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: false },

                   { name: ":information_source: CPU Model", value: `${os.cpus()[0].model}`, inline: false },

                   { name: "<:cpu:1123960958226792540> CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: false },

                   ({name: "<:memory:1123957561910099978> Memory", value: `${(memoryUsed/memoryTotal * 100).toFixed(1)}%`}),

                   { name:"<:nodejs:1123961023452426382> Node.js", value: process.version, inline: false },

                   { name: "<:djs:1123961072639029338> Discord.js", value: version, inline: false },

                   { name: "<:slash:1123961124216393728> Commands", value: `${client.commands.size}`, inline: false },

                   { name: "<:server:1123958202065747969> Servers", value: `${client.guilds.cache.size}`, inline: false },

                   { name: ":busts_in_silhouette: Users", value: `${client.guilds.cache.reduce((acc, guild) => acc+guild.memberCount, 0)}`, inline: false }

               )

       ]});

   }

};