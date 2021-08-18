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



module.exports = (client, oldChannel, newChannel) => {
    //-- Whitelist
 if(oldChannel.permissions === newChannel.permissionsOverwrite){
   return;
 } else {
   // -- Audit Logs
   try {
       //-- Mise a jour permissions
       axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=14`, {
           headers: {
               Authorization: `Bot ${config.token}`
           }
       }).then(response => {
           if (response.data && response.data.audit_log_entries[0].user_id) {
             connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
if(results[0]) {
return;
} else {
                   // -- Ban
                   axios({
                       url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                       method: 'PUT',
                       headers: {
                           Authorization: `Bot ${config.token}`
                       },
                       data: {
                           delete_message_days: '1',
                           reason: 'Protection: Mise a jour permissions salon'
                       }
                   })
                 }
                 newChannel.setName(oldChannel.name)
newChannel.permissionsOverwrite(oldChannel.permissionsOverwrite)
               })

 }

       });
       //-- Création permissions salon
       axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=13`, {
           headers: {
               Authorization: `Bot ${config.token}`
           }
       }).then(response => {
           if (response.data && response.data.audit_log_entries[0].user_id) {
             connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
if(results[0]) {
return;
} else {
                   // -- Ban
                   axios({
                       url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                       method: 'PUT',
                       headers: {
                           Authorization: `Bot ${config.token}`
                       },
                       data: {
                           delete_message_days: '1',
                           reason: 'Protection: Création permissions salon'
                       }
                   })
                   newChannel.setName(oldChannel.name)
  newChannel.permissionsOverwrite(oldChannel.permissionsOverwrite)
                 }
               })

 }

       });

       //-- Suppression permissions salon
       axios.get(`https://discord.com/api/v9/guilds/${config.guild}/audit-logs?ilimit=1&action_type=15`, {
           headers: {
               Authorization: `Bot ${config.token}`
           }
       }).then(response => {
           if (response.data && response.data.audit_log_entries[0].user_id) {
             connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${response.data.audit_log_entries[0].user_id}"`, async function(err, results, fields) {
if(results[0]) {
return;
} else {
  // -- Ban
                   axios({
                       url: `https://discord.com/api/v9/guilds/${config.guild}/bans/${response.data.audit_log_entries[0].user_id}`,
                       method: 'PUT',
                       headers: {
                           Authorization: `Bot ${config.token}`
                       },
                       data: {
                           delete_message_days: '1',
                           reason: 'Protection: Suppression permissions de salon'
                       }
                   })
                   newChannel.setName(oldChannel.name)
    newChannel.permissionsOverwrite(oldChannel.permissionsOverwrite)
                 }
               })

 }

       });
   } catch (error) {
       console.error(error);
   }

 }





}
