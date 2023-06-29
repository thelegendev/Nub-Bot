const { SlashCommandBuilder } = require(`discord.js`);
const { FastType } = require('discord-gamecord');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`fast-type`)
    .setDescription(`Play a game of fast type.`),
    async execute (interaction) {

        const game = new FastType({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '> Fast Type',
              color: '#2f3136',
              description: 'You have {time} seconds to type the sentence below.'
            },
            timeoutTime: 60000,
            sentence: 'A really cool sentence to fast type.',
            winMessage: '> 🎉 | You won! You finished the type race in {time} seconds with {wpm} wpm.',
            loseMessage: `> You lost, you couldn't type the correct sentence in time.`,
            timeoutMessage: '> The game went unfinished.',
          });
          
          try {
            await game.startGame();
          } catch (err) {
            console.log(err);
            await interaction.reply('There was an error starting the game!');
          }
    }
}