const { Client } = require('discord.js');
const fs = require('fs')
module.exports = {
	name: 'show-clowns',
	description: 'Usuwa ci wszystkie role związane z tym botem (nie usuwa roli typu admin, mod itd.), by użyć: {prefix}clear-roles',
	execute(msg, serverClowns) {
        var data = fs.readFileSync(`./clowns.json`);
        var iterator = JSON.parse(data);
        const newArray = Object.keys(iterator);


        return msg.channel.send("Lista Klaunów: \n" + newArray.map((i) => `${newArray.indexOf(i)+1}. ${i}`).join("\n"))
	},
};