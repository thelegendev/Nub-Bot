const { SlashCommandBuilder } = require(`discord.js`);
const { Hangman } = require(`discord-gamecord`);
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName(`hangman`)
    .setDescription(`Play a game of Hangman!`),
    async execute (interaction) {
 
        const game = new Hangman({
            message: interaction,
            embed: {
                title: `> Hangman`,
                color: `#2f3136`
            },
            hangman: { hat: "🎩", head: `👨‍🦰`, shirt: `👕`, pants: `🩳`, boots: `🥾🥾`},
            timeoutTime: 60000,
            timeWords: "all",
            winMessage: `> 🎉 | You won! The word was **{word}**`,
            loseMessage: `> You lost, the word was **{word}**`,
            timeoutMessage: '> The game went unfinished.',
            playerOnlyMessage: `Only {player} can use these buttons`,
        })
 
        try {
            await game.startGame();
          } catch (err) {
            console.log(err);
            await interaction.reply('There was an error starting the game!');
          }
    },
};