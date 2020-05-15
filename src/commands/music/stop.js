const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class StopCommand extends BaseCommand{
    constructor(){
        super('stop', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    if(player.queue[0]){
                        try{
                            player.queue.clear();
                            player.stop();
                            message.channel.send('Stopping your queue');
                            console.log(`Deleted queue for ${authorVoice.channel.name} in ${message.guild.name}.`)
                        }catch(error){
                            message.channel.send('I couldn\'t delete your voice channel.');
                            console.log(error);
                        }
                    }else{
                        message.channel.send('There is nothing to skip');
                    }
                }else{
                    message.channel.send('I am not in your voice channel.');
                }
            }else{
                message.channel.send('I ma not in a voice channel.')
            }
        }else{
            message.channel.send('You need to be in a voice channel first.');
        }
    }
}