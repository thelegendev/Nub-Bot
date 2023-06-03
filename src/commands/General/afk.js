const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const afkSchema = require('../../Schemas.js/afkSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Go AFK within the server.')
    .addSubcommand(command => command.setName('set').setDescription('Allows you to go AFK.').addStringOption(option => option.setName('reason').setDescription('Specified reason will be displayed as to why you went AFK.')))
    .addSubcommand(command => command.setName('remove').setDescription('Removes your AFK status.')),
    async execute(interaction) {
 
        const { options } = interaction;
        const sub = options.getSubcommand();
 
        const Data = await afkSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id});
 
        switch (sub) {
            case 'set':
 
            if (Data) return await interaction.reply({ content: `You are **already** AFK within this server!`, ephemeral: true});
            else {
                const reason = options.getString('reason') || 'No reason given!';
                const nickname = interaction.member.nickname || interaction.user.username;
 
                await afkSchema.create({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Message: reason,
                    Nickname: nickname
                })
 
                const name = `[AFK] ${nickname}`
                await interaction.member.setNickname(`${name}`).catch(err => {
                    return;
                })
 
                const embed = new EmbedBuilder()
                .setColor('#2f3136')
                .setTitle(`${interaction.user.username} has gone AFK`)
                .setDescription(`**Reason**: ${reason}`)
                .setFooter({ text: `🌙 Someone went AFK`})              
                .setTimestamp()
 
                interaction.reply({ content: `You are now **AFK**! \n Do **/afk remove** or type something in the chat to undo.`, ephemeral: true})
                interaction.channel.send({ embeds: [embed] })
            }
 
            break;
 
            case 'remove':
 
            if (!Data) return await interaction.reply({ content: `You are **not** AFK, can't remove **nothing**...`, ephemeral: true});
            else {
                const nick = Data.Nickname;
                await afkSchema.deleteMany({ Guild: interaction.guild.id, User: interaction.user.id})
 
                await interaction.member.setNickname(`${nick}`).catch(err => {
                    return;
                })
 
                const embed1 = new EmbedBuilder()
                .setColor('#2f3136')
                .setTitle(`${interaction.user.username} has returned from being AFK`)
                .setDescription(`${interaction.user.username} is back, say hi 👋`)
                .setFooter({ text: `🌙 Someone returned`})
                .setTimestamp()
 
                await interaction.reply({ content: `You are **no longer** AFK! Welcome back :)`, ephemeral: true})
                interaction.channel.send({ embeds: [embed1]})
            }
        }
    }
}