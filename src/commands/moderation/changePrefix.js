const BaseCommand = require('../../utils/structure/BaseCommand');
const StateManager = require('../../utils/StateManager');


module.exports = class HelpCommand extends BaseCommand{
    constructor(){
        super('changeprefix', 'owner', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, cmdArgs){

    
        if(message.member.id == message.guild.ownerID){
            const arg = cmdArgs[0];
            if(arg == undefined){
                message.channel.send('You need to specify a prefix.');
            }else{
                try {
                    await this.connection.query(
                        `UPDATE GuildConfigurable SET cmdPrefix = '${arg}' WHERE guildId = '${message.guild.id}'`
                    )
                    StateManager.emit('prefixUpdate', message.guild.id, arg);
                    message.channel.send('Prefix updated to : '+ arg);
                } catch (error) {
                    message.channel.send('An error ocurred while upadting prefix.');
                    console.log(error);
                }
           }
        }else{
            message.channel.send('You do not have the permission to do that.');
        }
    }
}

