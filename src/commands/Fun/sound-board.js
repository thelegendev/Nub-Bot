const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sound-board')
    .setDescription('Play the specified sound in vc.')
    .addStringOption(option =>
      option.setName('sound')
        .setDescription('Your choice')
        .setRequired(true)
        .addChoices(
          {name:'bruh', value:'bruh'},
          {name:'emotional damage', value:'emotional_damage'},
          {name:'fbi open up', value:'fbi_open_up'},
          {name:'galaxy brain', value:'galaxy_brain'},
          {name:'giga chad theme', value:'giga_chad_theme'},
          {name:'goofy ahh sounds', value:'goofy_ahh_sounds'},
          {name:'happy happy', value:'happy_happy'},
          {name:'mission passed', value:'mission_passed'},
          {name:'run', value:'run'},
          {name:'suiii', value:'suiii'},
          {name:'top g theme', value:'top_g_theme'},
          {name:'uwu', value:'uwu'},
          {name:'yamete kudasai', value:'yamete_kudasai'},
          )
    ),
  async execute(interaction) {
    const sound = interaction.options.getString('sound');
    let audioURL;

    if (sound === 'bruh') {

      audioURL = 'https://www.myinstants.com/media/sounds/movie_1_C2K5NH0.mp3';

    } else if (sound === 'emotional_damage') {

      audioURL = 'https://www.myinstants.com/media/sounds/emotional-damage-meme.mp3';

    } else if (sound === 'fbi_open_up') {

      audioURL = 'https://www.myinstants.com/media/sounds/fbi-open-up_dwLhIFf.mp3';

    } else if (sound === 'galaxy_brain') {

      audioURL = 'https://www.myinstants.com/media/sounds/galaxy-brain-meme.mp3';

    } else if (sound === 'giga_chad_theme') {

      audioURL = 'https://www.myinstants.com/media/sounds/giga-chad-theme.mp3';

    } else if (sound === 'goofy_ahh_sounds') {

      audioURL = 'https://www.myinstants.com/media/sounds/goofy-ahh-sounds.mp3';

    } else if (sound === 'happy_happy') {

      audioURL = 'https://www.myinstants.com/media/sounds/happy-happy-happy-song.mp3';

    } else if (sound === 'mission_passed') {

      audioURL = 'https://www.myinstants.com/media/sounds/gta-san-andreas-mission-complete-sound-hq.mp3';

    } else if (sound === 'run') {

      audioURL = 'https://www.myinstants.com/media/sounds/awolnation-run-audio-mp3cut_TdXTLux.mp3';

    } else if (sound === 'suiii') {

      audioURL = 'https://www.myinstants.com/media/sounds/suiiiiiiiiiii.mp3';
    
    } else if (sound === 'top_g_theme') {

      audioURL = 'https://www.myinstants.com/media/sounds/tourner-dans-le-vide.mp3';

    } else if (sound === 'uwu') {

      audioURL = 'https://www.myinstants.com/media/sounds/sussy-uwu.mp3';

    } else if (sound === 'yamete_kudasai') {

      audioURL = 'https://www.myinstants.com/media/sounds/yamate-kudasai-best-version.mp3';

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
      .setColor('#2f3136')
      .setImage('https://cdn.dribbble.com/users/1614722/screenshots/4419914/soundboard_animatie__zwart_.gif')
      .setTitle('Playing Sound')
      .setDescription(`Playing sound: ${sound}`)
      .setFooter({ text: `Sound Played`})
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