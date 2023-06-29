const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin-flip")
    .setDescription("Flip a coin."),

  async execute(interaction) {
    const embedd = new EmbedBuilder()
      .setColor("Random")
      .setImage(
        "https://media.discordapp.net/attachments/1083650198850523156/1084439687495700551/img_7541.gif?width=1600&height=1200"
      );
    await interaction.reply({ embeds: [embedd], fetchReply: true });

    setTimeout(() => {
      const choices = ["Heads", "Tails"];
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];

      const emoji =
        randomChoice === "Heads"
          ? "<:Heads:1084433697228468318>"
          : "<:Tails:1084433691964612612>";

      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${emoji} Its a ${randomChoice}`)
        .setFooter({ text: `Coin Flipped`})

      interaction.editReply({ embeds: [embed] });
    }, 1000);
  },
};