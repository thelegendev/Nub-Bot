const { SlashCommandBuilder } = require(`discord.js`);
const { Flood } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`flood`)
    .setDescription(`Play a game of flood.`),
    async execute (interaction) {

        const game = new Flood({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '> Flood',
              color: '#2f3136',
            },
            difficulty: 8,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
            winMessage: '> 🎉 | You won! You took **{turns}** turns.',
            loseMessage: '> You lost! You took **{turns}** turns.',
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