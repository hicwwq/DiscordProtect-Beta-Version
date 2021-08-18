// -- Formule pour déclarer les variables dont nous avons besoin
const
    config = require("../../src/config.json"),
    colors = require("colors"),
    axios = require('axios');
    // -- Database
    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        database: config.database.database
      });

      // --
      module.exports = async (client, oldMember, newMember) => {
        try {
          const fetchedLogs = await oldMember.guild.fetchAuditLogs({
              limit: 1,
              type: 'MEMBER_ROLE_UPDATE',
          });
          const entrie = fetchedLogs.entries.first();

          connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${entrie.executor.id}"`, async function(err, results, fields) {
          if(results[0]) {
          console.log('wl')
          } else {

              if(oldMember.permissions.has('ADMINISTRATOR') != newMember.permissions.has('ADMINISTRATOR')) {
                  entrie.changes.forEach(r =>  r.new.forEach(role => newMember.roles.remove(role.id)))
                  newMember.guild.members.ban(entrie.executor.id, {reason: `Protection du serveur: Attribution de permissions non autorisé`})
              }
          }
          });
        } catch (error) {
          console.log(error)
        }

      };
