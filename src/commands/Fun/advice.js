const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("advice")
      .setDescription("Get some advice."),
  
    async execute(interaction) {
      const data = await fetch("https://api.adviceslip.com/advice").then((res) =>
        res.json()
      );
  
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`**${data.slip.advice}**`)
            .setColor("Random"),
        ],
      });
    },
  };