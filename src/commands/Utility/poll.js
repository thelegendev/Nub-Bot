const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const pollschema = require('../../Schemas.js/pollSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Host a poll for all users to vote for.')
    .addStringOption(option => option.setName('topic').setDescription('the topic of the poll.').setRequired(true).setMinLength(1).setMaxLength(2000)),
    async execute(interaction) {
 
        await interaction.reply({ content: `Your poll has began!`})
        const topic = await interaction.options.getString('topic')
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setAuthor({ name: `Poll System`})
        .setFooter({ text: `Poll Started`})
        .setTimestamp()
        .setTitle('Poll Began')
        .setDescription(`${topic}`)
        .addFields({ name: `Upvotes`, value: `**No votes**`, inline: true})
        .addFields({ name: `Downvotes`, value: `**No votes**`, inline: true})
        .addFields({ name: `Author`, value: `${interaction.user}`})
 
        const buttons = new ActionRowBuilder()
        .addComponents(
 
        new ButtonBuilder()
        .setCustomId('up')
        .setLabel(' ')
        .setEmoji('<:upvote:779241903786950657>')
        .setStyle(ButtonStyle.Secondary),
 
        new ButtonBuilder()
        .setCustomId('down')
        .setLabel(' ')
        .setEmoji('<:downvote:779241955309518859>')
        .setStyle(ButtonStyle.Secondary),
 
        new ButtonBuilder()
        .setCustomId('votes')
        .setLabel('Votes')
        .setStyle(ButtonStyle.Secondary)
        )
 
        const msg = await interaction.channel.send({ embeds: [embed], components: [buttons] });
        msg.createMessageComponentCollector();
 
        await pollschema.create({
            Msg: msg.id,
            Upvote: 0,
            Downvote: 0,
            UpMembers: [],
            DownMembers: [],
            Guild: interaction.guild.id,
            Owner: interaction.user.id
        })
    }
}