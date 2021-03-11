const fs = require('fs'); 

const Discord = require('discord.js');
var { prefix, token, bot_name, bot_status} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

var serverClowns = readJSON('clowns.json');
refreshRoles();

//everything that happens on startup of this bot
client.on('ready', () => {
    console.log(`Sprawny i gotowy do akcji - ${client.user.tag}!`);
    applyChanges();

});

client.on('message', msg => {
        
    if (serverClowns[msg.author.username]){
        msg.react("🤡");
    }
    //msg.react("🤡");
    console.log(msg.author.id)

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
    	client.commands.get(command).execute(msg, args, serverClowns);

    } catch (error) {
    	console.error(error);
    	msg.reply('wystąpił błąd podczas wykonywania twojej komendy!');
    }

   
});

//reading all obtainable roles from clowns.json file
function refreshRoles(){
    serverClowns = readJSON('clowns.json');
    console.log(serverClowns);
}

function applyChanges(){
    reloadConfig();
    client.user.setUsername(bot_name);
    client.user.setActivity(bot_status);

}

//simplifying this to a function for avoiding redundancy
function readJSON(filePath){
    var data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function reloadConfig(){
    delete require.cache[require.resolve('./config.json')]
    var {prefix, token, bot_name, bot_status} = require("./config.json");
}

client.login(token);