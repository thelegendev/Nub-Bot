const { SlashCommandBuilder } = require(`discord.js`);
const { FindEmoji } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`find-emoji`)
    .setDescription(`Play a game of Find Emoji!`),
    async execute (interaction) {
      
      const game = new FindEmoji({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: '> Find Emoji',
          color: '#2f3136',
          description: 'Remember the emojis from the board below.',
          findDescription: 'Find the {emoji} emoji before the time runs out.'
        },
        timeoutTime: 60000,
        hideEmojiTime: 5000,
        buttonStyle: 'PRIMARY',
        emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
        winMessage: '> 🎉 | You won! You selected the correct emoji. {emoji}',
        loseMessage: '> You lost! You selected the wrong emoji. {emoji}',
        timeoutMessage: '> The game went unfinished.',
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });
      
      try {
          await game.startGame();
        } catch (err) {
          console.log(err);
          await interaction.reply('There was an error starting the game!');
        }
  },
};