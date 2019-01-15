const discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, randomcolor, prefix, discord, botconfig, mysql, con) => {


    if (!message.member.hasPermission('BAN_MEMBERS')) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Geen permissions.***\n\nPermission: **BAN_MEMBERS**`);

        return message.channel.send(embed)
    }

    var user = message.guild.member(message.mentions.users.first());
    var staff = message.author.username;

    if (!user) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Te wijnig argumenten.***\n\nGebruik: **${prefix}unban <@user>**`);

        return message.channel.send(embed);
    }

    if (user) {
        con.query(`DELETE FROM bans WHERE idUser = '${user.id}'`, (err, rows) => {

            if (err) throw err;

            message.channel.send(`U hebt **${user}** geunbanned!`);

        });
    }

};

module.exports.help = {
    name: "unban"
};