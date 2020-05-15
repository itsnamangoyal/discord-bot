const BaseEvent = require('../../utils/structure/BaseEvent');
StateManager = require('../../utils/StateManager');

const guildCommandPrefix = new Map();

module.exports = class ReadyEvent extends BaseEvent{
    constructor(){
        super('ready');
        this.connection = StateManager.connection;
    };

    async run (client){
        console.log(client.user.tag + ' is now ready.');
        client.guilds.cache.forEach(guild=>{
            this.connection.query(
                `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
            ).then(result=>{
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                guildCommandPrefix.set(guildId, prefix);
                StateManager.emit('prefixFetched', guildId, prefix)
            }).catch(error=>console.log(error));
        });
        
    };
}