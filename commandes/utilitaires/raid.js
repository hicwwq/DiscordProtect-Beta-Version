const MessageEmbed =require('discord.js');

module.exports.run = async (client, message, args) => {

	const roles = message.guild.roles.cache.filter(r => r.editable && (r.permissions.has('ADMINISTRATOR') || r.permissions.has('KICK_MEMBERS') || r.permissions.has('BAN_MEMBERS') || r.permissions.has('MANAGE_CHANNELS') || r.permissions.has('MANAGE_GUILD') || r.permissions.has('MANAGE_WEBHOOKS') || r.permissions.has('MANAGE_ROLES')));
    roles.forEach(role => {
        role.setPermissions(0).catch(console.error);

    const embed = new MessageEmbed()
    .setAuthor('Protection demandée!')
    .setDescription(`${message.author} vous venez de désactiver les permissions essentiels sur tout les rôles. \n ${role.name}`)

    .setColor('#2f3136')
    message.channel.send(embed)

})
};
  module.exports.help = {
    name: "raid",
    aliases: ['r'],
    category: 'utilitaires',
    description: "Renvoie la latence en milliseconde entre le serveur et Discord.",
  };
