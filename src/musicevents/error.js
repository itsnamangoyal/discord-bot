const BaseEvent = require('../utils/structure/BaseEvent');

module.exports = class NodeErrorEvent extends BaseEvent{
    constructor(){
        super('nodeError');
    }

    async run (client, node, error){
        console.log('An error occured with node:\n'+error);
    }
}