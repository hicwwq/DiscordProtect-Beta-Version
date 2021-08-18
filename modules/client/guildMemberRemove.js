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
    i_currentKicks = 0
i_maxKicks = 20

// -- Reset

var RESETKICK = setInterval(function() {
    m_kick = 0
    console.log(`[*] Le compteur de kick a été réintialiser`.blue)
}, 1 * 600000);




module.exports = async (client, member) => {
console.log('kick')
const fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
});
const entrie = fetchedLogs.entries.first();


if (entrie.target.id === member.id) {

connection.query(`SELECT * FROM \`whitelist\` WHERE \`id\` = "${entrie.executor.id}"`, async function(err, results, fields) {
if(results[0]) {
console.log('wl')
} else {
    // --
    if (i_currentKicks >= i_maxKicks) {
        member.guild.members.ban(entrie.executor.id, {reason: `Protection du serveur: Trop de kick`});

    // -- Notifications ?!
    const channel = member.guild.channels.cache.find(c => c.name === "_terminal");
    if(channel) channel.send('@everyone -- Activitée irrégulière, suppression des permissions dangereuses aux rôles effectuée.').catch(console.error);

    // -- 2
    const roles = member.guild.roles.cache.filter(r => r.editable && (r.permissions.has('ADMINISTRATOR') || r.permissions.has('KICK_MEMBERS') || r.permissions.has('BAN_MEMBERS') || r.permissions.has('MANAGE_CHANNELS') || r.permissions.has('MANAGE_GUILD') || r.permissions.has('MANAGE_WEBHOOKS') || r.permissions.has('MANAGE_ROLES')));
    roles.forEach(role => {
        role.setPermissions(0).catch(console.error);
    });
    } else {

    i_currentKicks++
    console.log(i_currentKicks)
    console.log(i_maxKicks)
    setTimeout(() => {
        i_currentKicks--
      }, 600000);
    }

}
});
}
};
