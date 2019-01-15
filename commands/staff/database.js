const discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args, randomcolor, prefix, discord, botconfig, mysql, con) => {

    if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Geen permissions.***\n\nPermission: **MANAGE_NICKNAMES**`);

        return message.channel.send(embed)
    }

    var user = message.guild.member(message.mentions.users.first());
    var bijnaam = args.join(" ").slice(22);

    if (user && !bijnaam) {

        con.query(`SELECT bijNaam FROM data WHERE idUser = ${user.id}`, (err, rows) => {

            if (err) throw err;

            if (rows.length >= 1) {

                message.channel.send(rows[0].bijNaam);

            } else {
                message.channel.send("Geen gegevens!");
            }

        });

    } else if (!user && !bijnaam) {


        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Te wijnig argumenten.***\n\nGebruik: **${prefix}setusername <@user> <username>**`);

        return message.channel.send(embed);

    } else if (user && bijnaam == "remove") {

        con.query(`DELETE FROM data WHERE idUser = '${user.id}'`, (err, rows) => {
            if (err) throw err;


            if (rows.length >= 1) {

                message.channel.send('Weg gehaald van bijnaam van ' + message.guild.members.get(user.id).user.username);

            } else {

                message.channel.send('Geen gegevens!');
            }


        });

    } else if (user && bijnaam) {

        con.query(`SELECT * FROM data WHERE idUser = '${user.id}'`, (err, rows) => {

            if (err) throw err;

            if (rows < 1) {

                con.query(`INSERT INTO data (idUser,bijNaam) values ("${user.id}","${bijnaam}")`);
                message.channel.send('Bijnaam veranderd!');

            } else {

                con.query(`UPDATE data SET bijNaam = '${bijnaam}' WHERE idUser = '${user.id}'`);
                message.channel.send('Bijnaam veranderd!')

            }

        });

    }
};


module.exports.help = {
    name: "setusername"
};