const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoS = require('../../Schemas.js/ecoSchema');
 
var timeout = [];
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdraw')
        .setDescription('Withdraw money from your bank to wallet.')
        .addNumberOption(option => option.setName('amount').setDescription('The amount to withdraw').setRequired(true)),
 
    async execute(interaction) {
        const { options, guild, user } = interaction;
        let data = await ecoS.findOne({ Guild: guild.id, user: user.id });
 
        const amount = options.getNumber('amount');
 
        if (!data) return await interaction.reply({ content: "You don't have an account, create one using `/economy-create account.`", ephemeral: true });
        else {
            if (data.Bank < amount) return await interaction.reply({ content: `Your trying to withdraw $${amount} while you only have $${data.Bank} available to do so...`})
 
            data.Bank -= amount;
            data.Wallet += amount;
            data.CommandsRan += 1;
            data.save();
 
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.tag} Withdrawn`, iconURL: user.avatarURL() })
                .setDescription(`You successfully withdrew **$${amount}** to your wallet ✅\n\n• Run \`/account view\` to view your new info.`)
                .setFooter({ text: `${guild.name}'s Economy` })
                .setColor('#2f3136')
                .setTimestamp()
 
            await interaction.reply({ embeds: [embed] });
        }
    }
}