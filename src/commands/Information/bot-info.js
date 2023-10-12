const { SlashCommandBuilder, EmbedBuilder,ChatInputCommandInteraction,Client, version } = require("discord.js");
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

                   { name: "<:bot:1160822375793827870> Client", value: client.user.tag, inline: true },

                   { name: "<:developer:1160822447227027519> Developer", value: `${client.application.owner.tag || "None"}`, inline: true },

                   { name: ":calendar_spiral: Created", value: `06-07-2021`, inline: true },

                   { name: "<a:timer:1160822980683771904> Uptime", value: `${uptime}`, inline: true },

                   { name: "<:signal:1160822953143976008> Latency", value: `${client.ws.ping}ms`, inline: true },

                   { name:":bar_chart: Database", value: status[connection.readyState], inline: true },

                   { name: ":desktop: System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true },

                   { name: ":information_source: CPU Model", value: `${os.cpus()[0].model}`, inline: true },

                   { name: "<:cpu:1160822724076261397> CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },

                   ({ name: "<:memory:1160822647395975248> Memory", value: `${(memoryUsed/memoryTotal * 100).toFixed(1)}%`, inline: true }),

                   { name:"<:nodejs:1160822575543361578> Node.js", value: process.version, inline: true },

                   { name: "<:djs:1160822521692684288> Discord.js", value: `v${version}`, inline: true },

                   { name: "<:slash:1160822770070982656> Commands", value: `${client.commands.size}`, inline: true },

                   { name: "<:discord:1160789164724338738> Servers", value: `${client.guilds.cache.size}`, inline: true },

                   { name: ":busts_in_silhouette: Users", value: `${client.guilds.cache.reduce((acc, guild) => acc+guild.memberCount, 0)}`, inline: true }

               )

       ]});

   }

};