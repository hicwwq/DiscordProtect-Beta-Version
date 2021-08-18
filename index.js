// --  Formule pour déclarer les variables
const
      config = require("./src/config.json"),
      { fs, readdirSync } = require("fs"),
      { Client, Collection, MessageEmbed} = require("discord.js"),
      client = new Client({fetchAllMembers: true}),
      figlet = require('figlet');
      colors = require('colors');
      readline = require('readline');

      // -- Database
      const mysql = require("mysql2");
      const connection = mysql.createConnection({
          host: config.database.host,
          user: config.database.user,
          database: config.database.database
        });

// -- Déclare les commandes de la Collection
client.commands = new Collection()

// -- Définis une couleur pour le texte des ASCII
colors.setTheme({
    custom: ['red', 'bold']
  });

// -- Détails graphiques lors du lancement du programme
console.clear()
process.title = "MewCore en cours de lancement.."
console.log(`
      _,met$$$$$gg.                `.green + `    _|      _|                              `.white + `    _|_|_|                                      `.green + `
    ,g$$$$$$$$$$$$$$$P.            `.green + `    _|_|  _|_|    _|_|    _|      _|      _|`.white + `  _|          _|_|    _|  _|_|    _|_|          `.green + `
  ,g$$P""       """Y$$.".          `.green + `    _|  _|  _|  _|_|_|_|  _|      _|      _|`.white + `  _|        _|    _|  _|_|      _|_|_|_|        `.green + `
 ,$$P'              '$$$.          `.green + `    _|      _|  _|          _|  _|  _|  _|  `.white + `  _|        _|    _|  _|        _|              `.green + `
',$$P       ,ggs.     '$$b:        `.green + `    _|      _|    _|_|_|      _|      _|    `.white + `    _|_|_|    _|_|    _|          _|_|_|        `.green + `
'd$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
  $$:      $$.   -    ,d$$'
   $$;      Y$b._   _,d$P'
    Y$$.    '.'"Y$$$$P"'
     '$$b      "-.__                                     `.green + `Le programme `.white + `MewCore v${config.version}`.bold.green + ` est en train de se lancer..`.white + `
       'Y$$b
         'Y$$.
            '$$b.
               'Y$$b.
                  '"Y$b._
                     '""""

                     Version: ${config.version}
                     credits: hicwwq
                     ________________________________________________________________________
                     `.green)

// -- Création d'une fonctions pour charger toutes les commandes
const loadCommands = (dir = "./commandes/") => {
    readdirSync(dir).forEach(dirs => {
      const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

      for (const file of commands) {
        const getFileName = require(`${dir}/${dirs}/${file}`);
        client.commands.set(getFileName.help.name, getFileName);
        console.log(`[COMMANDES]`.green + ` Chargement de la commande`.white + ` ${getFileName.help.name}.js`.red);
      };
    });
  };

// -- Création d'une fonctions pour charger touts les évènements
  const loadEvents = (dir = "./modules/") => {
    readdirSync(dir).forEach(dirs => {
      const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

      for (const event of events) {
        const evt = require(`${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));
        console.log(`[MODULES]`.green + ` Chargement du module`.white + ` ${evtName}.js`.blue);
      };
    });
  };

// -- Lancement des deux fonctions
  loadEvents();
  loadCommands();

// -- Tentatives de connections au bots
client.login(config.token)
// -- Message si une erreur interviens lorsque nous lançons le bot
.catch(e => {
console.clear(

)
console.log(`
      _,met$$$$$gg.                `.green + `    _|      _|                              `.white + `    _|_|_|                                      `.green + `
    ,g$$$$$$$$$$$$$$$P.            `.green + `    _|_|  _|_|    _|_|    _|      _|      _|`.white + `  _|          _|_|    _|  _|_|    _|_|          `.green + `
  ,g$$P""       """Y$$.".          `.green + `    _|  _|  _|  _|_|_|_|  _|      _|      _|`.white + `  _|        _|    _|  _|_|      _|_|_|_|        `.green + `
 ,$$P'              '$$$.          `.green + `    _|      _|  _|          _|  _|  _|  _|  `.white + `  _|        _|    _|  _|        _|              `.green + `
',$$P       ,ggs.     '$$b:        `.green + `    _|      _|    _|_|_|      _|      _|    `.white + `    _|_|_|    _|_|    _|          _|_|_|        `.green + `
'd$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
  $$:      $$.   -    ,d$$'
   $$;      Y$b._   _,d$P'
    Y$$.    '.'"Y$$$$P"'
     '$$b      "-.__                                     `.green + `Erreur rencontrée:`.red + ` Le programme ne peux pas se lancer car:`.white + `
       'Y$$b                                             `.green + ` - Le token fournis ne correspond a aucun bot`.white + `
         'Y$$.                                           `.green + ` - Le bot a été bannis de Discord `.white + `
            '$$b.                                        `.green + ` - L'api Discord.js rencontre actuellement des problèmes `.white + `
               'Y$$b.
                  '"Y$b._
                     '""""

                     Version: ${config.version}
                     ________________________________________________________________________
                     `.green)
});
// -- Copyright Apo x Hicwwq
