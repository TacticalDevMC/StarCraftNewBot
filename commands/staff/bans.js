const discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, randomcolor, prefix, discord, botconfig, mysql, con) => {


    if (!message.member.hasPermission('BAN_MEMBERS')) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Geen permissions.***\n\nPermission: **BAN_MEMBERS**`)

        return message.channel.send(embed)
    }

    con.query(`SELECT * FROM bans`, (err, rows) => {

        if (err) throw err;


        if (rows.length > 0) {

            for (var i = 0; i < rows.length; i++) {

                var id = rows[i].idUser;

                let embed = new discord.RichEmbed()
                    .setAuthor("Bans van StarCraft")
                    .setColor(randomcolor)
                    .setDescription(`idUser: **${rows[i].idUser}**\n\nuserName: **${rows[i].userName}**\n\nStaff: **${rows[i].staff}**\n\nReden: **${rows[i].reden}**`);
                message.channel.send(embed);

            }

        } else {

            message.channel.send('Geen bans gevonden.');
        }

    });

};

module.exports.help = {
    name: "bans"
};