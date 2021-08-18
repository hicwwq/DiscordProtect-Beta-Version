
module.exports.run = (client, message, args) => {
    if(!config.owner.includes(message.author.id)) return;


    message.channel.send(`🏓 Pong !`).then(m => m.edit(`🐧 Pong ! **(${client.ws.ping} ms)**`))
};


module.exports.help = {
    name: "ping",
    aliases: [],
    category: 'all',
    description: "tg fdp",
  };
