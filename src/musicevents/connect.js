const BaseEvent = require('../utils/structure/BaseEvent');

module.exports = class NodeConnectEvent extends BaseEvent{
    constructor(){
        super('nodeConnect');
    }

    async run (client, node){
        console.log('New node connected.');
    }
}