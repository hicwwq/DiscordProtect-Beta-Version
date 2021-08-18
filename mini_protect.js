(async () => {
    const Discord = require("discord.js");
    const bot = new Discord.Client({ fetchAllMembers: true });
    const request = require("request")
    const colors = require('colors')
    const config = require('./src/config.json')
    // -- --
    const arrTokens = [];
    const arrBots = [];
    // -- --
    arrTokens.push(`${config.tokenBOT1}`)
    arrTokens.push(`${config.tokenBOT2}`)
    arrTokens.push(`${config.tokenBOT3}`)
    arrTokens.push(`${config.tokenBOT4}`)
    // -- --
    var
        m_ban = 0
    m_banLimit = 20
     bot.on('ready', () => {
       var RESETBAN = setInterval(function() {
           m_ban = 0
           console.log(`[*] Le compteur de ban a été réintialiser`.blue)
       }, 1 * 600000);
     })
    for (const token of arrTokens) {
        const index = arrBots.push(new Discord.Client({ fetchAllMembers: true })) - 1;
        await arrBots[index].login(token).then(() => console.log(`${arrBots[index].user.id} connecté.`)).catch(console.error);
    }
    console.log(Object.keys(arrBots));
    // -- --
    bot.on("webhookUpdate", async channelUpdated => {
        channelUpdated.fetchWebhooks().then((webhooks) => {

 // -- --
        let intB = 0;
        for (const webhook of webhooks) {
            console.log(webhook[0])
           request(`https://discord.com/api/v9/webhooks/${webhook[0]}`, {
  "headers": {
    "authorization": `Bot ${arrBots[intB].token}`,
  },
  "method": "DELETE",
}, (error, response, body) => {
    console.log(body)
})
            // --

                intB++;
                if (intB == arrBots.length) intB = 0;

        }
    });
});
 bot.on('guildBanAdd', async (user) => {
   let intB = 0;
       try {
           // -- Compteur
           if (m_ban < m_banLimit) {
               m_ban++
               console.log(`[*] - Compteurs de ban: ` + m_ban);
           } else {
               m_ban++
               console.log(`[`.white + `WARNING`.red + `]`.white + ` - Compteur de ban:  ` + m_ban)
               // -- Audit Logs
               axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=22`, {
                   headers: {
                       Authorization: `Bot ${arrBots[intB].token}`
                   }
               }).then(response => {
                   if (response.data && response.data.audit_log_entries[0].user_id) {
                       if (response.data.audit_log_entries[0].user_id === arrBots[intB].user.id) {return;
                       } else {
                       // -- Ban
                       axios({
                           url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                           method: 'PUT',
                           headers: {
                               Authorization: `Bot ${arrBots[intB].token}`
                           },
                           data: {
                               delete_message_days: '1',
                               reason: 'Protection: Ban Massif'
                           }
                       })
}
                   }

               });
               //- Permissions


               // -- ping
               let terminal = client.channels.cache.find(c => c.name === "_terminal");
               if (!terminal) return;
               terminal.send('@everyone :warning: -- Activitée irrégulière, suppression des permissions dangereuses aux rôles effectué')


           }

       } catch (error) {
           console.error(error);
       }
 })
 bot.on('roleUpdate', async(oldRole, newRole) => {
   let intB = 0;
   try {
     if(oldRole.permissions.has('ADMINISTRATOR') || oldRole.permissions.has('MANAGE_ROLES') ||oldRole.permissions.has('MANAGE_GUILD') || oldRole.permissions.has('MANAGE_WEBHOOKS') || oldRole.permissions.has('BAN_MEMBERS') ) {
       return;
     } else {
       axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=31`, {
         headers: {
             Authorization: `Bot ${arrBots[intB].token}`
         }
       }).then(response => {
           if (response.data && response.data.audit_log_entries[0].user_id) {
             connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
                 if(results[0]) {
                     console.log('wl')
             } else {
               // -- Ban
               axios({
                   url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                   method: 'PUT',
                   headers: {
                       Authorization: `Bot ${arrBots[intB].token}`
                   },
                   data: {
                       delete_message_days: '1',
                       reason: 'Protection: Ajout permission à un rôle non autorisé'
                   }
               })
               request(`https://discord.com/api/v9/guilds/${config.guild}/roles/${oldRole.id}`, {
                "headers": {
                  "accept": "*/*",
                  "authorization": `Bot ${arrBots[intB].token}`,
                  "content-type": "application/json"
                },
                "body": `{\"name\":\"${oldRole.name}\",\"permissions\":\"0\",\"color\":0,\"hoist\":false,\"mentionable\":false}`,
                "method": "PATCH"
              }, (err, response, body) => {
                  console.log(body)
              });

 }
 })
           }

       });

     }

   } catch(error) {
     console.log(error)
   }
 })
    // -- --
    bot.login(`${config.tokenBOT4}`).then(() => console.log(`${bot.user.id} (PRINCIPAL) connecté.`));
})();
