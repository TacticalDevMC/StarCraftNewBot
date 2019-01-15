const discord = require("discord.js");
const client = new discord.Client();
const botconfig = require("./botconfig.json");
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const database = require('./database.json');
const mysql = require('mysql');

var prefix = botconfig.prefix;

client.commands = new discord.Collection();


fs.readdir('./commands/general', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue('[GENERAL] ') + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/general/${f}`)];

        var fileGet = require(`./commands/general/${f}`);
        console.log(chalk.blue('[GENERAL] ') + chalk.green(`De file ${f} is geladen`));

        client.commands.set(fileGet.help.name, fileGet);
    });
});

fs.readdir('./commands/staff', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log(chalk.blue('[STAFF] ') + chalk.red("Ik kon geen files vinden!"));
        return;
    }

    jsFiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/staff/${f}`)];

        var fileGet = require(`./commands/staff/${f}`);
        console.log(chalk.blue('[STAFF] ') + chalk.green(`De file ${f} is geladen`));

        client.commands.set(fileGet.help.name, fileGet);
    });
});

client.on('ready', async () => {
    setInterval(function () {
        let randomActivity = [`Server ip: *${botconfig.serverip}*`, "ItsJustJoran", "Lobby plugin connecten..", "Core to scanning..", "Mysql connecten..", `With ${client.commands.size} command(s).`];
        let activity = randomActivity[Math.floor(Math.random() * randomActivity.length)];
        client.user.setActivity(activity)
    }, [5000]);

    console.log('--------------------');
    console.log(chalk.cyan(`De ${client.user.username} is opgestart`));
    console.log(chalk.cyan(`Actief met ${client.commands.size} command(s).`));
    console.log('--------------------');
});

client.on('message', async message => {

    var con = mysql.createConnection({

        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database

    });

    con.connect(err => {

        if (err) throw err;

    });


    var random;

    random =
        [
            "#1d64b4",
            "#14dcb4",
            "#008000",
            "#ff8000",
            "#ff8000",
            "#40e0d0",
            "#028af1",
            "#dc143c",
            "#c3f6fe",
            "#ffb400",
            "#afff00",
            "#532cea",
            "#36d44a",
            "#6ff521",
            "#2441e2",
            "#7b72b6"
        ];

    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);


    var randomcolor = random[Math.floor(Math.random() * random.length)];

    const timestamp = `${moment().format("HH:mm:ss DD/MM/YYYY")}`;

    if (message.author.bot) return;

    if (message.channel.type === 'dm') return;

    //----------------------------------------------------
    if (!message.content.startsWith(prefix)) return;

    var messageArray = message.content.split(" ");

    var cmd = messageArray[0];

    var args = messageArray.slice(1);

    var commands = client.commands.get(cmd.slice(prefix.length));

    if (commands) commands.run(client, message, args, randomcolor, prefix, discord, botconfig, mysql, con);
});



client.on('guildMemberAdd', async member => {
    var con = mysql.createConnection({

        host: database.host,
        user: database.user,
        password: database.password,
        database: database.database

    });

    con.query(`SELECT * FROM data WHERE idUser = '${member.id}'`, (err, rows) => {
        if (rows < 1) {

            message.guild.channels.find('name', 'general').send(`Test, data is gezet!!`);
            con.query(`INSERT INTO data (idUser,bijNaam) values ("${member.id}","Speler | " ${member.username})`)

        } else {

            message.guild.channels.find('name', 'general').send(`Test, data is geupdated!!`);
            con.query(`UPDATE data SET bijNaam = '${bijnaam}' WHERE idUser = '${member.id}'`);

        }
    });
});


client.login(botconfig.token);