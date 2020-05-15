const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class SkipCommand extends BaseCommand{
    constructor(){
        super('skip', 'music', [])
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
                            message.channel.send(`Skipping...${player.queue[0].title}`);
                            player.stop();
                            console.log(`Skipped song for ${authorVoice.channel.name} in ${message.guild.name}.`);
                        }catch{
                            message.channel.send('I couldn\'t skip the song.');
                            console.log(`Error skipping song for ${authorVoice.channel.name} in ${message.guild.name}.`);
                        }
                    }else{
                        message.channel.send('There is nothing to skip.')
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