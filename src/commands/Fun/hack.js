const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hack')
    .setDescription(`Hack the mentioned user.`)
    .addUserOption(option => option
                  .setName('target')
                  .setDescription('The mentioned user will get hacked.')
                  .setRequired(true)
                  ),

    async execute(interaction) {
        const target = await interaction.options.getUser(`target`);
        if(!target) return await interaction.reply({ content: 'Who are you trying to hack huh? Hack yourself? Mention a valid user to hack smh...'});
        
        await interaction.reply({ content: `Running the process to hack ${target}...` })
        await wait(2500);
        await interaction.editReply({ content: `Installing malware on ${target}'s devices...` })
        await wait(2500);
        await interaction.editReply({ content: `Getting ${target}'s IP address, passwords and personal information...` })
        await wait(2500);
        await interaction.editReply({ content: `Hacking ${target}'s devices and Wi-Fi...` })
        await wait(2500);
        await interaction.editReply({ content: `Stealing ${target}'s mom's credit card...` })
        await wait(2500);
        await interaction.editReply({ content: `Exposing ${target}'s personal information...` })
        await wait(2500);
        await interaction.editReply({ content: `Mission complete! I've successfully hacked ${target}'s devices and exposed everything they possibly have! \n\n Respect++` })
    }
}