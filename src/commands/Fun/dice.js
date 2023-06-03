const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Roll a dice."),
 
    async execute (interaction) {
        const Nums = [ "1", "2", "3", "4", "5", "6"];
        const ball = Math.floor(Math.random() * Nums.length);
 
        const embed = new EmbedBuilder()
        .setTitle("Dice roll")
        .addFields(
            {name: "Number:", value: `${ball}`, inline: true},
            {name: "Requested by:", value: `<@${interaction.user.id}>`}
        )
        .setColor("Random")
 
        return interaction.reply({
            embeds: [embed]
        })
    }
}