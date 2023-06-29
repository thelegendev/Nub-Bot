const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const levelSchema = require("../../Schemas.js/levelSchema");
const Canvacord = require(`canvacord`)
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription(`Check an user's level/rank within the server.`)
    .addUserOption(option => option.setName('user').setDescription(`The member you want to check the rank of`).setRequired(false)),
    async execute(interaction, client) {
 
        const { options, user, guild } = interaction;
 
        const Member = options.getMember('user') || user;
 
        const member = guild.members.cache.get(Member.id);
 
        const Data = await levelSchema.findOne({ Guild: guild.id, User: member.id});
 
        const embed = new EmbedBuilder()
        .setColor("#2f3136")
        .setDescription(`${member} has not gained any XP yet`)
        if (!Data) return await interaction.reply({ embeds: [embed] })
 
        await interaction.deferReply();
 
        const Required = Data.Level * Data.Level * 20 + 20;
 
        const rank = new Canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ forceStatic: true }))
            .setBackground("IMAGE", "https://cdn.discordapp.com/attachments/999279806376067092/1090182157462413342/40b485db011495348be28942ba4318b2.png")
            .setCurrentXP(Data.XP)
            .setRequiredXP(Required)
            .setRank(1, "Rank", false)
            .setLevel(Data.Level, "Level")
            .setProgressBar("#2f3136", "COLOR")
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator)
 
        const Card = await rank.build();
 
        const attachment = new AttachmentBuilder(Card, { name: "rank.png"})
 
        const embed2 = new EmbedBuilder()
        .setColor("#2f3136")
        .setTitle(`${member.user.username}'s Rank Card`)
        .setImage("attachment://rank.png")
        .setFooter({ text: `${member.user.username}'s XP`})
 
        await interaction.editReply({ embeds: [embed2], files: [attachment] })
  
    }
}