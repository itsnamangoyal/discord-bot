const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class BanCommand extends BaseCommand{
    constructor(){
        super('ban', 'moderation', []);
    }

    run(){
        console.log(this.name + 'was ivoked');
    }
}