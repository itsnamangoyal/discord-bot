const BaseEvent = require('../../utils/structure/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefix = new Map();

module.exports = class MessageEvent extends BaseEvent{
    constructor(){
        super('message');
        this.connection = StateManager.connection;
    }

    async run(client, message){
        const guildPrefix = guildCommandPrefix.get(message.guild.id);
        if( message.author.bot || !message.content.startsWith(guildPrefix) || message.channel.type == 'dm') return
        const msg = message.content.split(guildPrefix)[1];
        const [cmd, ...cmdArgs] = msg.split(' ');
        const command = client.commands.get(cmd);
        if(command){
            command.run(client, message, cmdArgs);
        }    
    }
}

StateManager.on('prefixFetched', (guildId, prefix)=>{
    guildCommandPrefix.set(guildId, prefix);
})

StateManager.on('prefixUpdate', (guildId, prefix)=>{
    guildCommandPrefix.set(guildId, prefix);
})