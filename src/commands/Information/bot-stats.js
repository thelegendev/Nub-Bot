const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits,EmbedBuilder,ChatInputCommandInteraction,Client, ChannelType,UserFlags,version } = require("discord.js");

const { connection } = require("mongoose");
const os = require("os");

module.exports = {

 data : new SlashCommandBuilder()
            .setName("bot-stats")
            .setDescription("Receive some statistics about the bot."),

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

       

    await interaction.editReply({embeds: [

           new EmbedBuilder()

               .setColor("#2f3136")

               .setTitle(`${client.user.username}'s Stats`)

               .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

               .setDescription(client.application.description || null)

               .setTimestamp()

               .addFields(

                   { name: ":robot: Client", value: client.user.tag, inline: true },

                   { name: ":man_technologist: Developer", value: `${client.application.owner.tag || "None"}`, inline: true },

                   { name: ":calendar_spiral: Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },

                   { name: ":white_check_mark: Verified", value: client.user.flags & UserFlags.VerifiedBot ? "Yes" : "No", inline: true },

                   { name:":bar_chart: Database", value: status[connection.readyState], inline: true },

                   { name: ":desktop: System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true },

                   { name: ":information_source: CPU Model", value: `${os.cpus()[0].model}`, inline: true },

                   { name: ":chart_with_upwards_trend: CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },

                   { name: ":outbox_tray: Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },

                   { name:":page_facing_up: Node.js", value: process.version, inline: true },

                   { name: ":bulb: Discord.js", value: version, inline: true },

                   { name: ":satellite: Ping", value: `${client.ws.ping}ms`, inline: true },

                   { name: ":gear: Commands", value: `${client.commands.size}`, inline: true },

                   { name: ":tools: Servers", value: `${client.guilds.cache.size}`, inline: true },

                   { name: ":busts_in_silhouette: Users", value: `${client.guilds.cache.reduce((acc, guild) => acc+guild.memberCount, 0)}`, inline: true },

               )

       ]});

   }

};