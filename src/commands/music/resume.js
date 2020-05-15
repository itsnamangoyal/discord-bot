const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class ResumeCommand extends BaseCommand{
    constructor(){
        super('resume', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    if(!player.playing && player.queue[0]){
                        try{
                            message.channel.send(`Resuming...${player.queue[0].title}`);
                            player.pause(false);
                            console.log(`Resumed song for ${authorVoice.channel.name} in ${message.guild.name}.`);
                        }catch(error){
                            message.channel.send('I couldn\'t resume the song.');
                            console.log(`Error resuming song for ${authorVoice.channel.name} in ${message.guild.name}.`);
                            console.log(error);
                        }
                    }else{
                        // message.channel.send('Player is already playing.')
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