const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("find-game")
    .setDescription("Find a game you can enjoy.")
    .addStringOption(option => option
        .setName("category")
        .setDescription("category of games.")
        .addChoices(
            {name: "FPS", value: "FPS"},
            {name: "Shooter", value: "Shooter"},
            {name: "Arcade", value: "Arcade"},
            {name: "Rythm", value: "Rythm"},
            {name: "Action", value: "Action"},
            {name: "Racing", value: "Racing"},
            {name: "Military", value: "Military"},
            {name: "Adventure", value: "Adventure"},
        )
        .setRequired(true)
    ),
 
    async execute (interaction) {
        const Rythm = [
            "[Fuser](https://store.steampowered.com/app/1331440/FUSER/)", 
            "[AVICII Invector](https://store.steampowered.com/app/986800/AVICII_Invector/)",
            "[Ragnarock](https://store.steampowered.com/app/1345820/Ragnarock/)",
            "[Friday Night Funkin](https://de.crazygames.com/spiele/friday-night-funkin?utm_source=google&utm_medium=cpc&utm_campaign=google-serach-de&ad_group=135927663509&gclid=CjwKCAjwrJ-hBhB7EiwAuyBVXXq1ga9xFFhO5XZ3jhw4-bJXsKRJj_VmO9ukQvVhlWX96CH40IwLCBoCToAQAvD_BwE)", 
            "[Just Dance](https://store.steampowered.com/app/446560/Just_Dance_2017/)", 
            "[Thumper](https://store.steampowered.com/app/356400/Thumper/)", 
            "[Guitar Hero 3: Legends Of Rock](https://www.amazon.de/dp/B001RB25MM?tag=4players_coco_none-21&linkCode=osi&th=1&psc=1)", 
            "[Crypt Of The NecroDancer](https://store.steampowered.com/app/247080/Crypt_of_the_NecroDancer/)", 
            "[Pistol Whip](https://store.steampowered.com/app/1079800/Pistol_Whip/)", 
            "[Beat Saber](https://store.steampowered.com/app/620980/Beat_Saber/)",
            "[OSU!](https://osu.ppy.sh/home/download)",
            "[Mushe Dash](https://store.steampowered.com/app/774171/Muse_Dash/)"
        ];
        const FPS = [
            "[Halo Infinite](https://store.steampowered.com/app/1240440/Halo_Infinite/)", 
            "[Call of Duty MW2](https://store.steampowered.com/app/1938090/Call_of_Duty_Modern_Warfare_II/)", 
            "[Warzone 2](https://store.steampowered.com/app/1962663/Call_of_Duty_Warzone_20/)", 
            "[Quake 2021](https://store.steampowered.com/app/2310/Quake/)", 
            "[Black Mesa](https://store.steampowered.com/app/362890/Black_Mesa/)", 
            "[Doom Eternal](https://store.steampowered.com/app/782330/DOOM_Eternal/)", 
            "[Overwatch 2](https://overwatch.blizzard.com)", 
            "[CS:GO](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)", 
            "[Half Life 2](https://store.steampowered.com/app/220/HalfLife_2/)",
            "[Escape from tarkov](https://www.escapefromtarkov.com)", 
            "[Titanfall 2](https://store.steampowered.com/app/1237970/Titanfall_2/)", 
            "[Left 4 dead 2](https://store.steampowered.com/app/550/Left_4_Dead_2/)", 
            "[Team Fortess 2](https://store.steampowered.com/app/440/Team_Fortress_2/)", 
            "[Valorant](https://playvalorant.com)", 
            "[Unreal Tournament](https://www.epicgames.com/unrealtournament/en-US/)"
        ];
        const Arcade = [
            "[Dead Cells 2](https://store.steampowered.com/app/588650/Dead_Cells/)",
            "[NUTS](https://store.steampowered.com/app/768450/NUTS/)", 
            "[Assemble with care](https://store.steampowered.com/app/1202900/Assemble_with_Care/)", 
            "[Monster Hunter Strory +](https://store.steampowered.com/app/1277400/Monster_Hunter_Stories_2_Wings_of_Ruin/)", 
            "[Card of Darkness](https://www.cardofdarkness.com)", 
            "[Survival Z](https://store.steampowered.com/app/799500/SurvivalZ/)"
        ];
        const Shooter = [
            "[Apex Legends](https://store.steampowered.com/app/1172470/Apex_Legends/)", 
            "[Call of Duty MW2](https://store.steampowered.com/app/1938090/Call_of_Duty_Modern_Warfare_II/)2", 
            "[CS:GO](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)", 
            "[Destiny 2](https://store.steampowered.com/app/1085660/Destiny_2/)", 
            "[Fortnite](https://launcher.store.epicgames.com/de/)", 
            "[PUBG](https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/)", 
            "[Valorant](https://playvalorant.com)", 
            "[Overwatch 2](https://overwatch.blizzard.com)", 
            "[Battlefield 2042](https://store.steampowered.com/app/1517290/Battlefield_2042/)", 
        ];
        const Military = [
            "[Hell let loose](https://store.steampowered.com/app/686810/Hell_Let_Loose/)", 
            "[Pavlov VR](https://store.steampowered.com/app/555160/Pavlov_VR/)", 
            "[ARMA 3](https://store.steampowered.com/app/107410/Arma_3/)", 
            "[Sniper: Ghost Warrior Contracts 2](https://store.steampowered.com/app/1338770/Sniper_Ghost_Warrior_Contracts_2/)",
            "[Squad](https://store.steampowered.com/app/393380/Squad/)", 
            "[Enlisted](enlisted.ne)", 
            "[Call of Duty: Vanguard](https://www.callofduty.com/en/vanguard)", 
            "[Defcon](https://store.steampowered.com/app/1520/DEFCON/)", 
            "[Tannenberg](https://store.steampowered.com/app/633460/Tannenberg/)", 
            "[WARNO](https://store.steampowered.com/app/1611600/WARNO/)"
        ];
        const Action = [
            "[Dead Cells 2](https://store.steampowered.com/app/588650/Dead_Cells/)", 
            "[Sekiro: Shadows Die Twice](https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/)", 
            "[Bayonetta](https://www.nintendo.com/store/products/bayonetta-3-switch/)", 
            "[Batman Arkham City](https://store.steampowered.com/app/200260/Batman_Arkham_City__Game_of_the_Year_Edition/)", 
            "[Hotline Miami](https://store.steampowered.com/app/219150/Hotline_Miami/)", 
            "[Devil May Cry 5](https://store.steampowered.com/app/601150/Devil_May_Cry_5/)", 
            "[Monster Hunter World](https://store.steampowered.com/app/582010/Monster_Hunter_World/)", 
            "[Vanquish](https://store.steampowered.com/app/460810/Vanquish/)", 
            "[Resident Evil 2 2019](https://store.steampowered.com/app/883710/Resident_Evil_2/)", 
            "[TowerFall: Ascension](https://store.steampowered.com/app/251470/TowerFall_Ascension/)"
        ];
        const Racing = [
            "[Forza Horizon 5](https://store.steampowered.com/app/1551360/Forza_Horizon_5/)", 
            "[Dirt Rally 2](https://store.steampowered.com/app/690790/DiRT_Rally_20/)", 
            "[Shift 2](https://store.steampowered.com/app/47920/Shift_2_Unleashed/)", 
            "[Art of Rally](https://store.steampowered.com/app/550320/art_of_rally/)", 
            "[Project Cars 2](https://store.steampowered.com/app/860233/Sim_Racing_Telemetry__Project_Cars_2/)", 
            "[Wreckfest](https://store.steampowered.com/app/228380/Wreckfest/)",
            "[Trackmania](https://www.trackmania.com)"
        ];
        const Adventure = [
            "[The walking dead](https://store.steampowered.com/app/207610/The_Walking_Dead/)", 
            "[Chuchel](https://store.steampowered.com/app/711660/CHUCHEL/)", 
            "[Broken Sword](https://store.steampowered.com/app/57640/Broken_Sword_Directors_Cut/)", 
            "[Return to monkey island](https://store.steampowered.com/app/2060130/Return_to_Monkey_Island/)"
        ];
 
        const Category = interaction.options.getString("category");
 
        if (Category === "Rythm") {
            const choices = Math.floor(Math.random() * Rythm.length);
            const name = `${Rythm[choices]}`;
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${name}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "FPS") {
            const choices = Math.floor(Math.random() * FPS.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${FPS[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "Arcade") {
            const choices = Math.floor(Math.random() * Arcade.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${FPS[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
 
        if (Category === "Shooter") {
            const choices = Math.floor(Math.random() * Shooter.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${Shooter[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "Military") {
            const choices = Math.floor(Math.random() * Military.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${Military[choices]}`, inline: true},
                {name: "Requested by:",value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "Action") {
            const choices = Math.floor(Math.random() * Action.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${Action[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "Racing") {
            const choices = Math.floor(Math.random() * Racing.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${Action[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
        if (Category === "Adventure") {
            const choices = Math.floor(Math.random() * Adventure.length);
 
            const embed = new EmbedBuilder()
            .setTitle(`Game for category: ${Category}`)
            .setColor("Random")
            .addFields(
                {name: "Game", value: `${Adventure[choices]}`, inline: true},
                {name: "Requested by:", value: `<@${interaction.user.id}>`, inline: true}
            )
 
            return interaction.reply({
                embeds: [embed]
            });
        }
 
 
    }
}