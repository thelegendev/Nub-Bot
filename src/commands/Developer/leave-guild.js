const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("leave-guild")
    .setDescription("Make the bot leave a guild.")
    .addStringOption(option =>
      option.setName("guildid")
          .setDescription("provide the guild ID.")
          .setRequired(true)
    ),
                   
                    async execute(interaction, client) {

                      if(interaction.member.id !== '816250247616659489') return interaction.reply({ content: 'This command is locked under the developer.', ephemeral: true})

                      const guildid = interaction.options.getString("guildid");

                      const guild = client.guilds.cache.get(guildid)
                      
                      interaction.reply({content:`Nub Bot has left the guild mentioned below: \n\n **${guild.name}** (${guild.id})`, ephemeral: true})

                      guild.leave().catch(() => {
                    return false;
                    });

                    }
}