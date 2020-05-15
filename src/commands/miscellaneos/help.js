const BaseCommand = require('../../utils/structure/BaseCommand');


module.exports = class HelpCommand extends BaseCommand{
    constructor(){
        super('Help', 'miscellaneous', ['info']);
    }

    async run(client, message, cmdArgs){
        console.log(this.name + ' is called.');
    }
}

