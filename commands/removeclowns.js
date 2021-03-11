const fs = require('fs')
module.exports = {
	name: 'remove-clowns',
	description: 'Usuwa ci wszystkie role związane z tym botem (nie usuwa roli typu admin, mod itd.), by użyć: {prefix}clear-roles',
	execute(msg, serverClowns) {
        if (!msg.member.hasPermission('MANAGE_ROLES')){
            return msg.channel.send(`Nie masz uprawnień do modyfikowania ról!`)
        }
        //extremly hacky its the only way cause there seems to be bug which causes empty arrays if i try to assign values with serverRoles
        serverClowns = {}

        var dictString = JSON.stringify(serverClowns, null, 2);
        fs.writeFile("clowns.json", dictString, function(err, result) {
            if(err) console.log('error', err);
        });

        console.log(serverClowns);

        
        
        return msg.channel.send(`Klauny no more.`);

	},
};