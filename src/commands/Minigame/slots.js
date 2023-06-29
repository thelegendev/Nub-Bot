const { SlashCommandBuilder } = require(`discord.js`);
const { Slots } = require('discord-gamecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`slots`)
    .setDescription(`Play a game of slots.`),
    async execute (interaction) {

        const game = new Slots({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '> Slot Machine',
              color: '#2f3136'
            },
            slots: ['🍇', '🍊', '🍋', '🍌']
          });
          
          try {
            await game.startGame();
          } catch (err) {
            console.log(err);
            await interaction.reply('There was an error starting the game!');
          }

    },
};