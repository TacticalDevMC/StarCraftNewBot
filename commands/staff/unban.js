const discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args, randomcolor, prefix, discord, botconfig, mysql, con) => {


    // if (!message.member.hasPermission('BAN_MEMBERS')) {
    //     let embed = new discord.RichEmbed()
    //         .setAuthor('Error ❌')
    //         .setColor(randomcolor)
    //         .setDescription(`***Geen permissions.***\n\nPermission: **BAN_MEMBERS**`);
    //
    //     return message.channel.send(embed)
    // }
    //
    // var user = con.query(`SELECT userName FROM bans`);
    // var staff = message.author.username;
    //
    // if (!user) {
    //     let embed = new discord.RichEmbed()
    //         .setAuthor('Error ❌')
    //         .setColor(randomcolor)
    //         .setDescription(`***Te wijnig argumenten.***\n\nGebruik: **${prefix}unban <@user>**`);
    //
    //     return message.channel.send(embed);
    // }
    //
    // if (user) {
    //     con.query(`DELETE FROM bans WHERE idUser = '${user.id}'`, (err, rows) => {
    //
    //         if (err) throw err;
    //
    //         message.channel.send(`U hebt **${user.id}** geunbanned!`);
    //         message.guild.unban(user);
    //
    //     });
    // }

    message.channel.send('Deze functie staat momenteel uit.')

};

module.exports.help = {
    name: "unban"
};