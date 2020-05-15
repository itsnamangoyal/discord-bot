const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class PauseCommand extends BaseCommand{
    constructor(){
        super('pause', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    if(player.playing){
                        try{
                            message.channel.send(`Pausing...${player.queue[0].title}`);
                            player.pause(true);
                            console.log(`Skipped song for ${authorVoice.channel.name} in ${message.guild.name}.`);
                        }catch(error){
                            message.channel.send('I couldn\'t pasue the song.');
                            console.log(`Error pausing song for ${authorVoice.channel.name} in ${message.guild.name}.:\n${error}`);
                        }
                    }else{
                        message.channel.send('Player is already paused.')
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