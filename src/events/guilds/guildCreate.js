const BaseEvent = require('../../utils/structure/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildcreateEvent extends BaseEvent{
    constructor(){
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run(client, guild){
        console.log('Registering new guild.')
        try {
            await this.connection.query(
                `INSERT INTO Guilds Values('${guild.id}', '${guild.owner.id}')`
            );
            await this.connection.query(
                `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
            );  
            console.log(`New guild :${guild.id}: registered successfully.`);
        } catch (error) {
            console.log(`Error whlle registering guild:\n${error}`);
        }
   }
}