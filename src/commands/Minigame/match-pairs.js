const { SlashCommandBuilder } = require(`discord.js`);
const { MatchPairs } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`match-pairs`)
    .setDescription(`Play a game of Match Pairs!`),
    async execute (interaction) {

        const game = new MatchPairs({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '> Match Pairs',
              color: '#2f3136',
              description: '**Click on the buttons to match emojis with their pairs.**'
            },
            timeoutTime: 60000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
            winMessage: '> 🎉 | **You won the Game! You turned a total of `{tilesTurned}` tiles.**',
            loseMessage: '> **You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
            timeoutMessage: '> The game went unfinished.',
            playerOnlyMessage: 'Only {player} can use these buttons.'
          });
          
          try {
            await game.startGame();
          } catch (err) {
            console.log(err);
            await interaction.reply('There was an error starting the game!');
          }
        }
    }