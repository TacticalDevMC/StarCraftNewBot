const discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, randomcolor, prefix, discord, botconfig) => {

    let toggleon = '<:toggleon:486989343592808464>';

    message.channel.send(':ping_pong:, we zijn de bot zijn ping aan het ophalen, even geduld..').then(message => {
        message.edit(`:ping_pong: Pong\n\n${Math.round(bot.ping)}ms`);
    });

};

module.exports.help = {
    name: "ping"
};