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
    var reden = args.join(" ").slice(22);
    var banStatus = true;

    if (!user) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Te wijnig argumenten.***\n\nGebruik: **${prefix}ban <@user> <reason>**`);

        return message.channel.send(embed);
    }

    if (user.hasPermission("BAN_MEMBERS")) return message.channel.send('U kunt geen moderators bannen!!');

    if (!reden) {
        let embed = new discord.RichEmbed()
            .setAuthor('Error ❌')
            .setColor(randomcolor)
            .setDescription(`***Te wijnig argumenten.***\n\n**Geen reden opgegeven.**`);

        return message.channel.send(embed);
    }

    if (user && reden) {
        con.query(`SELECT * FROM bans WHERE idUser = '${user.id}'`, (err, rows) => {

            if (err) throw err;

            if (rows.length < 1) {

                con.query(`INSERT INTO bans (idUser,userName,staff,reden,banStatus) values ("${user.id}","${message.guild.members.get(user.id).user.username}","${staff}","${reden}","${banStatus}")`)
                message.channel.send('U hebt deze user gebanned!');

                let logChannel = message.guild.channels.find('name', 'logs');

                let embedPm = new discord.RichEmbed()
                    .setAuthor("Verbannen van StarCraft")
                    .setColor(randomcolor)
                    .setDescription(`U bent verbannen van de StarCraft discord server.\n\nUsername: **${message.guild.members.get(user.id).user.username}**\n\nStaff: **${staff}**\n\nReden: **${reden}**`)

                let embedChannel = new discord.RichEmbed()
                    .setAuthor("Verbannen van StarCraft")
                    .setColor(randomcolor)
                    .setDescription(`Er is iemand verbannen van de StarCraft discord server.\n\nUsername: **${message.guild.members.get(user.id).user.username}**\n\nStaff: **${staff}**\n\nReden: **${reden}**`)

                user.send(embedPm);
                logChannel.send(embedChannel);
                user.ban(reden)

            } else {

                message.channel.send('Deze user is al gebanned!')

            }

        });
    }

};

module.exports.help = {
    name: "ban"
};