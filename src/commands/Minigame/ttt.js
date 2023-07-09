const { SlashCommandBuilder } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ttt')
    .setDescription('Play a game of tic tac toe.')
    .addUserOption(option => 
      option.setName('opponent')
        .setDescription('Specified user will be your opponent.')
        .setRequired(true)),
 
  async execute(interaction) {
 
    const enemy = interaction.options.getUser('opponent');
    if (interaction.user.id === enemy.id) return await interaction.reply({ content: `You **cannot** play with yourself, silly goose...`, ephemeral: true});
    if (enemy.bot) return await interaction.reply({ content: `You **cannot** play with a bot, silly goose...`, ephemeral: true});
 
    const game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser('opponent'),
      embed: {
        title: '> Tic Tac Toe',
        rejectTitle: "Cancelled Request",
        color: '#2f3136',
        statusTitle: '• Status',
        overTitle: '• Game Over',
        rejectColor: "#2f3136",
 
      },
      emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖'
      },
      mentionUser: true,
      timeoutTime: 120000,
      xButtonStyle: 'DANGER',
      oButtonStyle: 'PRIMARY',
      turnMessage: '> {emoji} | **{player}**, it is your turn!.',
      winMessage: '> 🎉 | **{player}** has won the Tic Tac Toe Game!',
      tieMessage: '> The game turned out to be a tie!',
      timeoutMessage: '> The game went unfinished.',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.',
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