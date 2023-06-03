const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sound-board')
    .setDescription('Play the specified sound in the vc.')
    .addStringOption(option =>
      option.setName('sound')
        .setDescription('Your choice')
        .setRequired(true)
        .addChoices(
          {name:'bruh',value:'Bruh'},
          {name:'uwu',value:'uwu'})
    ),
  async execute(interaction) {
    const sound = interaction.options.getString('sound');
    let audioURL;

    if (sound === 'Bruh') {
      audioURL = 'https://www.myinstants.com/media/sounds/movie_1_C2K5NH0.mp3';

    } else if (sound === 'uwu') {

      audioURL = 'https://www.myinstants.com/media/sounds/sussy-uwu.mp3';

    }  
      

    if (!interaction.member.voice.channel) {
      await interaction.reply({content:'You must be in a voice channel to use this command.',ephemeral:true});
      return;
    }

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

      const audioPlayer = createAudioPlayer();

    connection.subscribe(audioPlayer);

    const audioResource = createAudioResource(audioURL);

    audioPlayer.play(audioResource);

    const embedMessage = new EmbedBuilder()

      .setColor('Green')
      .setImage('https://cdn.dribbble.com/users/1614722/screenshots/4419914/soundboard_animatie__zwart_.gif')
    
      .setTitle('Playing Sound')

      .setDescription(`Playing sound: ${sound}`)

      .setTimestamp();

    const message = await interaction.reply({ embeds: [embedMessage], fetchReply: true,ephemeral:true });

    audioPlayer.on('stateChange', (oldState, newState) => {

      if (newState.status === 'idle') {

        connection.destroy();

        embedMessage.setImage('https://i.imgur.com/ETWgRqs.png').setDescription(`Finished playing sound: ${sound}`);

        interaction.editReply({ embeds: [embedMessage],ephemeral:true });

      }

    });

    audioPlayer.on('error', error => {

      console.error(error);

      connection.destroy();

      embedMessage.setDescription(`Error playing sound: ${sound}`);

      interaction.editReply({ embeds: [embedMessage] });

    });

  },

};