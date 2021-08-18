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



// -- Reset




module.exports = (client, role) => {


    try {



        // -- Audit Logs
        axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=32`, {
            headers: {
                Authorization: `Bot ${config.token}`
            }
        }).then(response => {
            if (response.data && response.data.audit_log_entries[0].user_id) {
              connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
if(results[0]) {
return;
} else {
                    axios({
                        url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                        method: 'PUT',
                        headers: {
                            Authorization: `Bot ${config.token}`
                        },
                        data: {
                            delete_message_days: '1',
                            reason: 'Protection: Suppression rôle non autorisé'
                        }
                    })
                       // -- Delete Nouveau Rôle
    axios({
        url: `https://discord.com/api/v9/guilds/${config.guild}/roles/${role.id}`,
        method: "POST",
        headers: {
            Authorization: `Bot ${config.token}`
        },
        data: {
            name: `${role.name}`
        }
    })
                  }
              })
            }
        });

    } catch (error) {
        console.error(error);
    }



};
