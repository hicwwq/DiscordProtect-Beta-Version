// -- Formule pour déclarer les variables dont nous avons besoin
const
    config = require("../../src/config.json"),
    colors = require("colors"),
    axios = require('axios');
// -- Database
// -- Database
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.database
  });

//-- Code


module.exports = async (client, member) => {

    try {
        if (member.user.bot) {
            console.log(member.user.tag);
            const
                fetchedLogs = await member.guild.fetchAuditLogs({
                    limit: 1,
                    type: 'BOT_ADD'
                }),
                entrie = fetchedLogs.entries.first();
            //-- Whitelist
            if(config.owner.includes(entrie.executor.id)) {
              return;
            } else {
              //-- Ban le mec qui a add
              member.guild.members.ban(entrie.executor.id, {
                  reason: 'Protection: Ajout de bot non autorisé'
              })
              //-- Ban du bot
              member.guild.members.ban(member.id);
            }

      }
     } catch (error) {
        console.error(error);
    }

}
