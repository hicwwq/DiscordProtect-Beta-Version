const config = require("./../../src/config.json");
const { MessageEmbed } = require('discord.js');
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    database: config.database.database
  });


module.exports.run = async (client, message, args) => {
    if(!config.owner.includes(message.author.id)) return;

    if(args[0] === "add") {
    if(!args[1]) return;
    let user = message.mentions.users.first() || await client.users.fetch(args[1])
    if(!user) return;

    connection.query(`SELECT * FROM \`bot\` WHERE \`id\` = "${user.id}"`, function(err, results, fields) {
        if(!results[0]) {
            connection.query(`INSERT INTO \`bot\`(\`id\`, \`name\`, \`author\`, \`guild\`) VALUES ("${user.id}","${user.username}","${message.author.id}","${message.guild.id}")`)
            message.channel.send(`${message.author}, ${user} fais désormais partie de la whitelist bot.`)
        } else {
            message.channel.send(`${message.author}, ${user} est déjà dans la whitelist bot.`)
        }
       });
    } else if(args[0] === "remove") {
        if(!args[1]) return;
        let user = message.mentions.users.first() || await client.users.fetch(args[1])
        if(!user) return;

        connection.query(`SELECT * FROM \`bot\` WHERE \`id\` = "${user.id}"`, function(err, results, fields) {
            if(!results[0]) {
                message.channel.send(`${message.author}, ${user} n'est pas dans la whitelist bot.`)
            } else {
                connection.query(`DELETE FROM \`bot\` WHERE \`id\` = "${user.id}"`)
                message.channel.send(`${message.author}, ${user} ne fais plus partie de la whitelist bot.`)
            }
           });
    } else  {
        connection.query(`SELECT * FROM \`bot\``, function(err, results, fields) {
         const embed = new MessageEmbed()
         .setTitle(`Liste des bot étant whitelist sur votre bot qui peuvent être ajouter: (${results.length})`)
         .setDescription(results.map(r => `**${r.name}** (${r.id})`).join(`\n`))
         message.channel.send(embed)


        });
        }
};


module.exports.help = {
    name: "bot",
    aliases: ['botwl','whitelistbot','botwhitelist'],
    category: 'all',
    description: "jsp",
  };
