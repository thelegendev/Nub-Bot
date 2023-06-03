const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle,EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gunfight')
    .setDescription('Play a game of Cowboy!')
    .addUserOption(option => option.setName('player').setDescription('Select a player to challenge').setRequired(true)),
  async execute(interaction) {
    const player = interaction.options.getUser('player');
    if (player.id === interaction.user.id) {
      return interaction.reply({ content: 'You cannot challenge yourself!', ephemeral: true });
    }

    const acceptButton = new ButtonBuilder()
      .setCustomId('accept')
      .setLabel('Accept')
      .setStyle(ButtonStyle.Success);

    const declineButton = new ButtonBuilder()
      .setCustomId('decline')
      .setLabel('Decline')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(acceptButton, declineButton);

    await interaction.reply({
      content: `${player}, you have been challenged to a cowboy game by ${interaction.user}! Do you want to accept this challenge?`,
      components: [row],
    });

    const filter = i => i.user.id === player.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on('collect', async i => {
      if (i.customId === 'accept') {
        collector.stop('accept');
        const words = ['shoot', 'draw', 'aim', 'reload', 'fire', 'bullets'];
        const word = words[Math.floor(Math.random() * words.length)];
        const delay = Math.floor(Math.random() * 5000) + 3000;

        const readyEmbed = new EmbedBuilder()
          .setTitle('Get Ready!')
          .setDescription('The game will start at any moment.')
          .setImage('https://giffiles.alphacoders.com/102/102565.gif')
          .setColor('#ffa500');

        await interaction.followUp({ embeds: [readyEmbed] });

        await new Promise(resolve => setTimeout(resolve, delay));

        await interaction.followUp(`The word is **${word}**! TYPE NOW!`);

        const winnerFilter = m => m.content.toLowerCase() === word.toLowerCase();
        const winner = await interaction.channel.awaitMessages({ filter: winnerFilter, max: 1, time: 60000 });

        if (!winner.size) {
          await interaction.followUp(`No one typed the word in time. It's a tie!`);
        } else {
          const winnerUser = winner.first().author;
          const winnerEmbed = new EmbedBuilder()
            .setTitle('Congratulations!')
            .setImage('https://media.tenor.com/oDedOU2hfZcAAAAC/anime-cowboybebop.gif')
            .setDescription(`${winnerUser} won the cowboy game against ${interaction.user.id === winnerUser.id ? player : interaction.user}!`)
            .setColor('#00ff00');
          await interaction.followUp({ embeds: [winnerEmbed] });
        }
      } else if (i.customId === 'decline') {
        collector.stop('decline');
        await interaction.followUp(`${player} declined the challenge. Maybe next time!`);
      }
    });

    collector.on('end', async (collected, reason) => {
      if (reason === 'time') {
        await interaction.followUp({

        content: `${player} did not respond in time. Maybe next time!`,

        components: [],

      });

    }

  });

}
    }