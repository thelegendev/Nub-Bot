const { SlashCommandBuilder } = require(`discord.js`);
const { Snake } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`snake`)
    .setDescription(`Play a game of Snake!`),
    async execute (interaction) {

        const game = new Snake({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '> Snake Game',
              overTitle: 'Game Over',
              color: '#2f3136'
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
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