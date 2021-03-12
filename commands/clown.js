var fs = require('fs'); 
module.exports = {
	name: 'clown',
	description: 'Dodaje klauna do pliku clowns.json (tylko dla admina/moderatora), by użyć: {prefix}add-role {role-name} {role-id}',
	execute(msg, args, serverClowns) {

        return msg.channel.send({files: ["./images/clown.png"]});

	},
};