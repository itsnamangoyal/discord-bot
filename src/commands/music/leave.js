const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand{
    constructor(){
        super('leave', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channel.id){
                    try{
                        client.music.players.destroy(guildId);
                        message.channel.send('Left you voice channel.');
                        console.log(`Left ${authorVoice.channel.name} in ${message.guild.name}.`)
                    }catch(error){
                        message.channel.send('I couldn\'t leave your voice channel.');
                        console.log(error);
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