const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class ShuffleCommand extends BaseCommand{
    constructor(){
        super('shuffle', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    if(!player.queue.empty){
                        try{
                            message.channel.send(`shuffling your queue.`);
                            player.queue.shuffle();
                            console.log(`Shuffled queue for ${authorVoice.channel.name} in ${message.guild.name}.`);
                        }catch(error){
                            message.channel.send('I couldn\'t shuffle the queue.');
                            console.log(`Error shuffling queue for ${authorVoice.channel.name} in ${message.guild.name}.`);
                            console.log(error);
                        }
                    }else{
                        message.channel.send('Your queue is empty.')
                    }
                    
                    
                }else{
                    message.channel.send('I am not in your voice channel.');
                }
            }else{
                message.channel.send('I am not in a voice channel.')
            }
        }else{
            message.channel.send('You need to be in a voice channel first.');
        }
    }
}