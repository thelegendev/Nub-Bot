const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const figlet = require('figlet');
const filter = require('../../../filter.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ascii')
    .setDescription('Converts given text to ascii.')
    .addStringOption(option => option.setName('text').setDescription('Specified text will be converted into art.').setRequired(true).setMaxLength(15)),
    async execute(interaction) {
        const text = interaction.options.getString('text')

        figlet(`${text}`, function (err, data) {

            if (err) {
                return interaction.reply({ content: `**Oops!** Something went **extremely** wrong, try again later!`, ephemeral: true})
            }

            if (filter.words.includes(text)) return interaction.reply({ content: `You can't say that!`, ephemeral: true});

            const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setFooter({ text: `Ascii Art Generated`})
            .setDescription(`\`\`\`${data}\`\`\``)
            .setTimestamp()

            interaction.reply({ embeds: [embed] });
        
        });
    }
}