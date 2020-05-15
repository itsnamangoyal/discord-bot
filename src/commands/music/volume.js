const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class VolumeCommand extends BaseCommand{
    constructor(){
        super('volume', 'music', [])
    }
    async run(client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    if(args[0]){
                        if(parseInt(args[0]) <= 100){
                            player.setVolume(parseInt(args[0]));
                            message.channel.send(`Volume of player set to : ${player.volume}/100`);
                        }
                    }else{
                        message.channel.send(`Current volume of player : ${player.volume}/100`);
                    }
                }else{
                    message.channel.send('I am not in your voice channel.');
                }
            }else{
                message.channel.send('I am not in a voice channel.');
            }
        }else{
            message.channel.send('You need to be in a voice channel first.');
        }
    }
}