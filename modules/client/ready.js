// -- Formule pour déclarer les variables dont nous avons besoin
const
config = require("../../src/config.json"),
colors = require("colors")
 // -- Database
 const mysql = require("mysql2");
 const connection = mysql.createConnection({
     host: config.database.host,
     user: config.database.user,
     database: config.database.database
   });


// -- Récupere les modules de l'événements
module.exports = (client) => {

    // -- Changement du programme pour validé le chargement
    process.title = "MewCore- Actif"
    console.clear()
    console.log(`
      _,met$$$$$gg.                `.green + `    _|      _|                              `.white + `    _|_|_|                                      `.green + `
    ,g$$$$$$$$$$$$$$$P.            `.green + `    _|_|  _|_|    _|_|    _|      _|      _|`.white + `  _|          _|_|    _|  _|_|    _|_|          `.green + `
  ,g$$P""       """Y$$.".          `.green + `    _|  _|  _|  _|_|_|_|  _|      _|      _|`.white + `  _|        _|    _|  _|_|      _|_|_|_|        `.green + `
 ,$$P'              '$$$.          `.green + `    _|      _|  _|          _|  _|  _|  _|  `.white + `  _|        _|    _|  _|        _|              `.green + `
',$$P       ,ggs.     '$$b:        `.green + `    _|      _|    _|_|_|      _|      _|    `.white + `    _|_|_|    _|_|    _|          _|_|_|        `.green + `
'd$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
  $$:      $$.   -    ,d$$'                        `.green + `[+] Chargement de `.white + `MewCore v${config.version}`.green + ` terminé.`.white + `
   $$;      Y$b._   _,d$P'
    Y$$.    '.'"Y$$$$P"'
     '$$b      "-.__                                        `.green + `- Pseudonyme:`.white + ` ${client.user.username}`.green + `
       'Y$$b                                                `.green + `↪ Discriminateur:`.white + ` ${client.user.discriminator}`.green + `
         'Y$$.                                              `.green + `↪ ID:`.white + ` ${client.user.id}`.green + `
            '$$b.
               'Y$$b.                                        `.green + `↪ Nombre de utilisateur:`.white + ` ${client.users.cache.size} membres`.green + `
                  '"Y$b._                                    `.green + `↪ Nombre de guildes:`.white + ` ${client.guilds.cache.size} guildes`.green + `
                     '""""

                     Version: ${config.version}
                     credits: hicwwq
                     ________________________________________________________________________
                     `.green)
// -- Changement du status du bot
client.user.setPresence({ activity: { name: `discord.gg/portorico ${config.version}` ,type: "STREAMING", url: "http://twitch.tv/twitter" }, status: 'idle' })
  // --
}
