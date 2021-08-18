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

    connection.query(`SELECT * FROM \`blacklist\` WHERE \`id\` = "${user.id}"`, function(err, results, fields) {
        if(!results[0]) {
            connection.query(`INSERT INTO \`blacklist\`(\`id\`, \`name\`, \`author\`, \`guild\`) VALUES ("${user.id}","${user.username}","${message.author.id}","${message.guild.id}")`)
            message.channel.send(`${message.author}, ${user} fais désormais partie de la blacklist.`)
            message.guild.members.ban(user.id, { reason: `Membre Blacklist`})
        } else {
            message.channel.send(`${message.author}, ${user} est déjà dans la blacklist.`)
        }
       });
    } else if(args[0] === "remove") {
        if(!args[1]) return;
        let user = message.mentions.users.first() || await client.users.fetch(args[1])
        if(!user) return;

        connection.query(`SELECT * FROM \`blacklist\` WHERE \`id\` = "${user.id}"`, function(err, results, fields) {
            if(!results[0]) {
                message.channel.send(`${message.author}, ${user} n'est pas dans la blacklist.`)
            } else {
                connection.query(`DELETE FROM \`blacklist\` WHERE \`id\` = "${user.id}"`)
                message.channel.send(`${message.author}, ${user} ne fais plus partie de la blacklist.`)
                message.guild.members.unban(user.id, { reason: `Membre retiré de la Blacklist`})
            }
           });
    } else {
    connection.query(`SELECT * FROM \`blacklist\``, function(err, results, fields) {
     const embed = new MessageEmbed()
     .setTitle(`Liste des personnes étant blacklist sur votre bot (${results.length})`)
     .setDescription(results.map(r => `**${r.name}** (${r.id})`).join(`\n`))
     message.channel.send(embed)


    });
    }
};


module.exports.help = {
    name: "blacklist",
    aliases: ['bl'],
    category: 'all',
    description: "blacklist une personne",
  };
