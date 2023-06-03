const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoS = require('../../Schemas.js/ecoSchema');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('economy-create')
        .setDescription('Create an economy account.')
        .addSubcommand(command =>
            command
                .setName('account')
                .setDescription('Create an economy account')
        ),
 
    async execute(interaction) {
        const { options, guild, user } = interaction;
 
        let data = await ecoS.findOne({ Guild: guild.id });
        const sub = options.getSubcommand();
 
        const embed = new EmbedBuilder()
 
        switch (sub) {
            case "account":
                if (data) return await interaction.reply({ content: "You already have an economy account!", ephemeral: true })
                else {
                    await ecoS.create({
                        Guild: guild.id,
                        User: user.id,
                        Bank: 5000,
                        Wallet: 5000,
                        Worked: 0,
                        Gambled: 0,
                        Begged: 0,
                        HoursWokred: 0,
                        CommandsRan: 0,
                        Moderated: 0
                    });
 
                    embed.setAuthor({ name: `${interaction.user.tag}'s Account`, iconURL: user.avatarURL() })
                        .setColor('#2f3136')
                        .setDescription('You have created an economy account, you have been awarded:\n\n• $5000 -> 🏦\n• $5000 -> 💵\n\n__Run `/account view` to view your balance and information.__')
                        .setFooter({ text: `${guild.name}'s Economy` })
                        .setTimestamp();
                }
                break;
        }
 
        await interaction.reply({ embeds: [embed] });
 
    }
}