const { SlashCommandBuilder } = require("discord.js");
const { Minesweeper } = require("discord-gamecord");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('minesweeper')
      .setDescription('Play a game of minesweeper.'),

  async execute(interaction) {

    const game = new Minesweeper({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "> Minesweeper",
        color: "#2f3136",
        description: "Click on the buttons to reveal the blocks except mines.",
      },
      emojis: { flag: "🚩", mine: "💣" },
      mines: 5,
      timeoutTime: 60000,
      winMessage: "> 🎉 | You have won the game! All mines were successfully avoided by you. ",
      loseMessage: "> You failed the game. Next time, be cautious of the mines.",
      timeoutMessage: '> The game went unfinished.',
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    try {
        await game.startGame();
      } catch (err) {
        console.log(err);
        await interaction.reply('There was an error starting the game!');
      }
  },
};