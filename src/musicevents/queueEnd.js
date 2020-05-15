const BaseEvent = require('../utils/structure/BaseEvent');

module.exports = class QueueEndEvent extends BaseEvent{
    constructor(){
        super('queueEnd');
    }

    async run (client, player){
        player.textChannel.send(`Queue has ended.`);
        console.log(`Queue ended for ${player.guild.id}.`);
    }
}