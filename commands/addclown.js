var fs = require('fs'); 
module.exports = {
	name: 'add-clown',
	description: 'Dodaje klauna do pliku clowns.json (tylko dla admina/moderatora), by użyć: {prefix}add-role {role-name} {role-id}',
	execute(msg, args, serverClowns) {
        if (!args.length) {
            return msg.channel.send(`Nie podałeś argumentów!`);
        } else if (!msg.member.hasPermission('MANAGE_ROLES')){
            return msg.channel.send(`Nie masz uprawnień do modyfikowania ról!`)
        }
        if(serverClowns[args[0]]){
            return msg.channel.send(`Klaun o nazwie "${args[0]}" już istnieje!`);
        }

        const clown_name = msg.mentions.users.first();
        const clown_id = clown_name.id;
        
        serverClowns[clown_name.username] = clown_id;

        var dictString = JSON.stringify(serverClowns, null, 2);
        fs.writeFile("clowns.json", dictString, function(err, result) {
            if(err) console.log('error', err);
        });

        console.log(serverClowns);
        
        return msg.channel.send(`Klaun ${args[0]} został/a dodany/na do puli klaunów`)
	},
};