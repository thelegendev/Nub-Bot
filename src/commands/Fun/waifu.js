const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('waifu')
    .setDescription('Get a random waifu image.')
    .addStringOption(option => 
        option.setName('category')
            .setDescription('Choose your category')
            .setRequired(true)
            .addChoices(
                {name:'Marin Kitagawa', value:'marin-kitagawa'},
                {name:'Mori Calliope', value:'mori-calliope'},
                {name:'Raiden Shogun', value:'raiden-shogun'},
                {name:'Waifu', value:'waifu'},
                {name:'Maid',value:'maid'},
                {name:'Oppai',value: 'oppai'},
                {name:'Selfies', value:'selfies'},
                {name:'Uniform', value:'uniform'}
            )),
  async execute(interaction) {
    const type = interaction.options.getString('category');
    const body = await fetch(`https://api.waifu.im/search/?included_tags=${type}`).then(res => res.json());

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Waifu!`)
      .setColor('Random')
      .setFooter({text:interaction.user.username,iconURL: interaction.member.displayAvatarURL({ dynamic: true })})
      .setTimestamp()
      .setImage(body.images[0].url);

    interaction.reply({ embeds: [embed] });

    const message = await interaction.fetchReply();
    await message.react('👍');
    await message.react('👎');
  },
};