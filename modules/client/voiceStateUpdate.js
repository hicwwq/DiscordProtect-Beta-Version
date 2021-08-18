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

// Variable pour limite
var
m_deco = 0
m_decoLimit = 10

// -- Reset

var RESETDECO = setInterval (function () {
  m_deco = 0
  console.log(`[*] Le compteur de Déconnexion a été réintialiser`.blue)
}, 1 * 120000);




module.exports = (client, oldState,newState) => {
 //-- Deconnexion massif
 if(oldState.channel != newState.channel && oldState.channel != null && newState.channel != null) return;
  if(oldState.channel && !newState.channel){
    try {
        // -- Compteur
        if (m_deco < m_decoLimit) {
            m_deco++
            console.log(`[*] - Compteurs de membre déconncter du vocal: ` + m_deco);
        } else {
            m_deco++
            console.log(`[`.white + `WARNING`.red + `]`.white + ` - Compteur de membre déconnecter du vocal:  ` + m_deco)
            // -- Audit Logs
            axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=27`, {
                headers: {
                    Authorization: `Bot ${config.token}`
                }
            }).then(response => {
                if (response.data && response.data.audit_log_entries[0].user_id) {
                  connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
    if(results[0]) {
    return;
    } else {
                        // -- BAN
                        axios({
                            url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                            method: 'PUT',
                            headers: {
                                Authorization: `Bot ${config.token}`
                            },
                            data: {
                                delete_message_days: '1',
                                reason: 'Protection: Déconnexion Massif'
                            }
                        })

                      }
                  })
                }

            });



        }



    } catch (error) {
        console.error(error);
    }

  }



};
