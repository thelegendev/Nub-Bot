const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const levelSchema = require(`../../Schemas.js/levelSchema`)
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp-leaderboard')
    .setDescription(`Check the server's xp leaderboard.`),
    async execute(interaction) {
 
        const { guild, client } = interaction;
 
        let text = "";
 
        const Data = await levelSchema.find({ Guild: guild.id})
            .sort({ 
                XP: -1,
                Level: -1
            })
            .limit(10)
        
        const embed1 = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`No one is on the leaderboard yet...`)
        if (!Data) return await interaction.reply({ embeds: [embed1]})
 
            await interaction.deferReply()
 
            for(let counter = 0; counter < Data.length; ++counter) {
                let { User, XP, Level } = Data[counter]
 
                    const value = await client.users.fetch(User) || "Unknown Member"
 
                    const member = value.tag;
 
                    text += `${counter + 1}. ${member} | XP: ${XP} | Level: ${Level} \n`
 
                    const embed = new EmbedBuilder()
                        .setColor("#2f3136")
                        .setTitle(`${interaction.guild.name}'s XP Leaderboard`)
                        .setDescription(`\`\`\`${text}\`\`\``)
                        .setTimestamp()
                        .setFooter({ text: `XP Leaderboard` })
 
                   interaction.editReply({ embeds: [embed] })
 
            } 
 
    }
}