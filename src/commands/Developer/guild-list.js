const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("guild-list")
    .setDescription("Lists all the guilds the bot is currently in."),
 
  async execute(interaction, client) {
    
    try {
      
      if (interaction.user.id !== "816250247616659489") {
        
        return await interaction.reply({
          content: "This command is locked under the developer.",
          ephemeral: true
        });

      }
      
      const guilds = client.guilds.cache;
      const pageSize = 5;
      const pages = Math.ceil(guilds.size / pageSize);
      let page = 1;
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
 
      let guildList = "";
      let index = 1;
 
      for (const [guildId, guild] of guilds) {
        
        const owner = guild.members.cache.get(guild.ownerId);
 
        if (!owner) continue;
 
        if (index > end) break;
 
        if (index > start) {
          guildList += `**__Guild__**: ${guild.name} (${guildId})\n`;
          guildList += `**__Guild Owner__**: ${owner.user.tag} (${owner.user.id})\n`;
          guildList += `**__Members__**: ${guild.memberCount}\n\n`;
        }
        index++;

      }
 
      const embed = new EmbedBuilder()
        .setTitle(`Nub Bot is currently in **${client.guilds.cache.size}** Servers`)
        .setDescription(guildList)
        .setColor("#2f3136")
        .setFooter({ text: `Page ${page}/${pages}` })
        .setTimestamp();
 
      const msg = await interaction.reply({

        embeds: [embed],
        fetchReply: true

      });
 
      if (pages > 1) {

        await msg.react("⬅️");
        await msg.react("➡️");
 
        const filter = (reaction, user) =>
          ["⬅️", "➡️"].includes(reaction.emoji.name) &&
          user.id === interaction.user.id;
        
        const collector = msg.createReactionCollector({ filter, time: 60000 });
 
        collector.on("collect", async (reaction) => {

          if (reaction.emoji.name === "⬅️" && page > 1) {
            page--;
          } else if (reaction.emoji.name === "➡️" && page < pages) {
            page++;
          } else if (reaction.emoji.name === "⬅️" && page === 1) {
            page = pages;
          } else if (reaction.emoji.name === "➡️" && page === pages) {
            page = 1;
          }
 
          const newstart = (page - 1) * pageSize;
          const newend = page * pageSize;
 
          guildList = "";
          index = 1;
 
          for (const [guildId, guild] of guilds) {

            const owner = guild.members.cache.get(guild.ownerId);
 
            if (!owner) continue;
 
            if (index > newend) break;
 
            if (index > newstart) {
                guildList += `**__Guild__**: ${guild.name} (${guildId})\n`;
                guildList += `**__Guild Owner__**: ${owner.user.tag} (${owner.user.id})\n`;
                guildList += `**__Members__**: ${guild.memberCount}\n\n`;
            }
 
            index++;

          }
 
          embed
            .setDescription(guildList)
            .setFooter({ text: `Page ${page}/${pages}` });
          
          await msg.edit({ embeds: [embed] });
          await reaction.users.remove(interaction.user);
          collector.resetTimer();
          
        });
 
        collector.on("end", async () => {

          msg.reactions.removeAll().catch(console.error);
          embed.setFooter({ text: `Page ${page}/${pages} (page inactive)` });
          await msg.edit({ embeds: [embed] });

        });
      }

    } catch (error) {

      console.error(error);

      return interaction.reply({

        content: "An **error** occured while trying to execute this command!",
        ephemeral: true

      });
    }
  },
};