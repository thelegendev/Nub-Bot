const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("advice")
      .setDescription("Get some random advice."),
  
    async execute(interaction) {
      const data = await fetch("https://api.adviceslip.com/advice").then((res) =>
        res.json()
      );
  
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Advice for you")
            .setDescription(`Take it or leave it! \n "**${data.slip.advice}**"`)
            .setColor("Random")
            .setFooter({ text: `Random Advice Generated`})
        ],
      });
    },
  };