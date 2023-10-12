const { ActivityType } = require('discord.js');
const mongoose = require('mongoose')
const mongodbURL = process.env.MONGODBURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
      console.log(`[ ✅ ] ${client.user.tag} is now online!`)
      console.log(`[ ⚠️ ] Enabling status...`);

      setInterval(async() => {
        const servers = await client.guilds.cache.size;
        const users = await client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
        );
    
        let status = [
        {
          name: "/help",
          type: ActivityType.Playing,
        },
        {
          name: `${servers} servers`,
          type: ActivityType.Watching,
        },
        {
          name: `${users} users`,
          type: ActivityType.Listening,
        }
        ];

        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 5000);
      
      console.log("[ ✅ ] Sucessfully enabled status!");

        if (!mongodbURL) return;

        mongoose.set('strictQuery', true);
        await mongoose.connect(mongodbURL || '', {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if (mongoose.connect) {
            console.log("[ ✅ ] The database is up and running!")
        }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};