const { SlashCommandBuilder } = require("discord.js");
const { RockPaperScissors } = require("discord-gamecord");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('rps')
      .setDescription('Play a game of Rock Paper Scissors!')
      .addUserOption(option => 
        option.setName('opponent')
          .setDescription('Specified user will be your opponent.')
          .setRequired(true)),

  async execute(interaction) {
    
    const enemy = interaction.options.getUser('opponent');
    if (interaction.user.id === enemy.id) return await interaction.reply({ content: `You **cannot** play with yourself, silly goose...`, ephemeral: true});
    if (enemy.bot) return await interaction.reply({ content: `You **cannot** play with a bot, silly goose...`, ephemeral: true});

    const game = new RockPaperScissors({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser('opponent'),
      embed: {
        title: "Rock Paper Scissors",
        rejectTitle: "Cancelled Request",
        statusTitle: "• Status",
        overTitle: "• Game Over",
        color: "#2f3136",
        rejectColor: "Red",
      },
      buttons: {
        rock: "Rock",
        paper: "Paper",
        scissors: "Scissors",
      },
      emojis: {
        rock: "🌑",
        paper: "📰",
        scissors: "✂️",
      },
      mentionUser: true,
      timeoutTime: 120000,
      buttonStyle: "PRIMARY",
      pickMessage: "> You chose {emoji}.",
      winMessage: "> 🎉 | **{player}** has won the Rock-Paper-Scissors Game!",
      tieMessage: "> The game turned out to be a tie!",
      timeoutMessage: "> The game went unfinished.",
      playerOnlyMessage: "Only {player} and {opponent} can use these buttons!",
      rejectMessage: "{opponent} denied your request for a round of Tic Tac Toe!",
    });

    try {
        await game.startGame();
      } catch (err) {
        console.log(err);
        await interaction.reply('There was an error starting the game!');
      }
  },
};