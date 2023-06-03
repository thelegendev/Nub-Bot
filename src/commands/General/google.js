const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuider, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("google")
  .setDescription("Search anything using Google.")
  .addStringOption((option) => 
                  option.setName("topic")
                  .setDescription("topic to search")
                  .setRequired(true)),
  /**
  *
  * @param {ChatInputCommandInteraction} interaction
  */
  execute(interaction) {
    const topic = interaction.options.getString("topic").slice().split(" ")
    const search = topic.join("+")
    const row  = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Google Search")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://google.com/search?q=${search}`)
    );
    
    const embed = new EmbedBuilder()
    .setTitle("Google")
    .setDescription(`Click [here](https://google.com/search?q=${search}) or the button  below me to view your google search`)
    interaction.reply({ embeds: [embed], components: [row]})
  }
}