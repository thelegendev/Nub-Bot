// do npm i axios

// made by @fuzzx

const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');

const key = ''; // Go to https://emoji-api.com and make a key and replace this variable with it :/

const searchEmoji = async (term) => {

  try {

    const response = await axios.get(`https://emoji-api.com/emojis?search=${term}&access_key=${key}`);

    if (!response.data || response.data.length === 0) {

      return `No emoji found for "${term}".`;

    }

    const emoji = response.data[0];

    const emojiInfo = `**Emoji:** \`${emoji.character}\` ( ${emoji.character} )\n` +

      `**Emoji Name (Discord):** \`:${emoji.slug}:\`\n` +

      `**Emoji Name (Default Name):** \`${emoji.unicodeName}\`\n`;

    return emojiInfo;

  } catch (error) {

    console.error('Error searching emoji:', error);

    return 'An error occurred while searching for the emoji.';

  }

};

module.exports = {

  data: new SlashCommandBuilder()

    .setName('emoji-find')

    .setDescription('Looks for an emoji for you')

    .addStringOption(option =>

      option.setName('emoji-name')

        .setDescription('Emoji Name')

        .setRequired(true)

    ),

  async execute(interaction) {

    const searchTerm = interaction.options.getString('emoji-name');

    const result = await searchEmoji(searchTerm);

    if (result.startsWith('No emoji found') || result.startsWith('An error occurred')) {

      await interaction.reply(result);

      return;

    }

    const embed = {

      color: 0x00ff00,

      title: `Emoji Information for "${searchTerm}"`,

      description: result,

    };

    await interaction.reply({ embeds: [embed] });

  },

};

