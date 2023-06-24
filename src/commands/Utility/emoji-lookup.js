// do npm i axios
// made by @fuzzx

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');

const key = 'HiLegendReadThis'; // Go to https://emoji-api.com and make a key and replace this variable with it :/

let response;
let data;

const searchEmoji = async (term, num) => {
  try {
    response = await axios.get(`https://emoji-api.com/emojis?search=${term}&access_key=${key}`);

    if (!response.data || response.data.length === 0) {
      return `No emoji found for "${term}".`;
    }

    data = response.data[num];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emoji-find')
    .setDescription('Looks for an emoji for you')
    .addStringOption((option) =>
      option.setName('emoji-name').setDescription('Emoji Name').setRequired(true)
    ),

  async execute(interaction) {
    let count = 0;
    const logo =
      'https://media.discordapp.net/attachments/1116733595659288578/1118251816279355412/apollo.png?width=594&height=546';

    const searchTerm = interaction.options.getString('emoji-name');
    await searchEmoji(searchTerm, count);

    const embed = new EmbedBuilder()
      .setTitle(`Search Results for "${searchTerm}"`)
      .setColor('Orange')
      .setThumbnail(logo)
      .setFooter({ iconURL: logo, text: `Apollo's Emoji Explorer` })
      .setTimestamp()
      .setDescription(
        `**Emoji:** \`${data.character}\` ( ${data.character} )\n**Emoji Name (Discord):** \`:${data.slug}:\`\n**Emoji Name (Default Name):** \`${data.unicodeName}\`\n**Unicode:**\`U1+${data.codePoint}\`\n**Group Name:** \`${data.group}\`\n**Sub Group Name:** \`${data.subGroup}\``
      );

    const maxCount = response.data.length - 1;
    const minCount = 0;

    const btns = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('back')
          .setEmoji('◀️')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder().setCustomId('forward').setEmoji('▶️').setStyle(ButtonStyle.Primary)
      );

    const msg = await interaction.reply({ embeds: [embed], components: [btns] });

    const collector = msg.createMessageComponentCollector();

    collector.on('collect', async (i) => {
      if (i.customId === 'back') {
        if (count === minCount) return await i.reply({ content: `This is the start of the list.`, ephemeral: true });

        count--;
        await searchEmoji(searchTerm, count);

        const updatedEmbed = new EmbedBuilder()
          .setFooter({ iconURL: logo, text: `Apollo's Emoji Explorer` })
          .setTitle(`Search Results for "${searchTerm}"`)
          .setColor('Orange')
          .setTimestamp()
          .setThumbnail(logo)
          .setDescription(
            `**Emoji:** \`${data.character}\` ( ${data.character} )\n**Emoji Name (Discord):** \`:${data.slug}:\`\n**Emoji Name (Default Name):** \`${data.unicodeName}\`\n**Unicode:** \`U1+${data.codePoint}\`\n**Group Name:** \`${data.group}\`\n**Sub Group Name:** \`${data.subGroup}\``
          );

        btns.components[0].setDisabled(count === minCount); // Update back button disabled state
        btns.components[1].setDisabled(false); // Enable forward button

        i.update({ embeds: [updatedEmbed], components: [btns] });
      }
      if (i.customId === 'forward') {
        if (count === maxCount) return await i.reply({ content: `You are on the last emoji!`, ephemeral: true });

        count++;
        await searchEmoji(searchTerm, count);

        const updatedEmbed = new EmbedBuilder()
          .setTitle(`Search Results for "${searchTerm}"`)
          .setColor('Orange')
          .setTimestamp()
          .setThumbnail(logo)
          .setFooter({ iconURL: logo, text: `Apollo's Emoji Explorer` })
          .setDescription(
            `**Emoji:** \`${data.character}\` ( ${data.character} )\n**Emoji Name (Discord):** \`:${data.slug}:\`\n**Emoji Name (Default Name):** \`${data.unicodeName}\`\n**Unicode:** \`U1+${data.codePoint}\`\n**Group Name:** \`${data.group}\`\n**Sub Group Name:** \`${data.subGroup}\``
          );

        btns.components[0].setDisabled(false); // Enable back button
        btns.components[1].setDisabled(count === maxCount); // Update forward button disabled state

        i.update({ embeds: [updatedEmbed], components: [btns] });
      }
    });
  },
};
