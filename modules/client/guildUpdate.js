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


// -- Code

module.exports = async (client, oldGuild, newGuild) => {
    try {
        if (newGuild.vanityURLCode !== "portorico") {
        var ms = Date.now()
        const req = await axios.patch(`https://discord.com/api/v9/guilds/${config.guild}/vanity-url`, {
            code: "portorico"
        }, {
            headers: {
                "content-Type": "application/json",
                "authorization": `Bot ${config.token}`
            }
        });
        console.log(req.data, Date.now() - ms)

        // --
        const auditLogs = await newGuild.fetchAuditLogs({
            type: 1
        });
        const entris = auditLogs.entries.filter(e => e.executor.id != client.user.id)
        const entrie = entris.first()
        if (!entrie) return;
        if (entrie.changes[0].new !== "portorico") {
            newGuild.members.ban(entrie.executor.id, {
                reason: `Tentative de changement d'URL non autorisé`
            })
        }
    }
} catch(error) {
    console.error(error)
}

}
