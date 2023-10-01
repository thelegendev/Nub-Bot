const { Wordle } = require('discord-gamecord');
const { SlashCommandBuilder } = require('discord.js');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription(`Play a game of wordle.`),

    async execute (interaction) {
 
        const game = new Wordle({
            message: interaction,
            isSlashGame: true,
            embed: {
                title: `> Wordle`,
                color: '#2f3136'
            },
            customWord: null,
            timeoutTime: 60000,
            winMessage: '> 🎉 | You won! The word was **{word}**.',
            loseMessage: '> You lost! The word was **{word}**.',
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