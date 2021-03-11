var fs = require('fs'); 
module.exports = {
	name: 'remove-clown',
	description: 'Usuwa ci wybraną rolę związaną z tym botem (nie usuwa roli typu admin, mod itd.), by użyć: {prefix}remove-role {role-name}',
	execute(msg, args, serverClowns) {
        if (!args.length) {
            return msg.channel.send(`Nie podałeś argumentów!`);
        } else if (!msg.member.hasPermission('MANAGE_ROLES')){
            return msg.channel.send(`Nie masz uprawnień do modyfikowania ról!`)
        }

        const clown_name = msg.mentions.users.first();

		if(serverClowns[clown_name.username]){
            serverClowns[clown_name.username] = ""

            var dictString = JSON.stringify(serverClowns, null, 2);
            fs.writeFile("clowns.json", dictString, function(err, result) {
                if(err) console.log('error', err);
            });

            console.log(serverClowns);

            return msg.channel.send(`Usunąłeś klauna ${args[0]}!`)

        } else{
            return msg.channel.send(`Taki klaun nie istnieje!`);
        }
	},
};