const BaseCommand = require('../../utils/structure/BaseCommand');

module.exports = class JoinCommand extends BaseCommand{
    constructor(){
        super('join', 'music', []);
    }

    run(client, message, args){
        const authorVoiceChannel = message.member.voice.channel;
        if(authorVoiceChannel){
            const player = client.music.players.get(message.guild.id);
            if(!player){
                const guild = message.guild;
                const textChannel = message.channel;
                // console.log(guild, authorVoiceChannel, textChannel);
                const player = client.music.players.spawn({
                    guild: guild,
                    voiceChannel: authorVoiceChannel,
                    textChannel: textChannel
                });
                client.music.players.set(message.guild.id, player);
                console.log(`Joined ${authorVoiceChannel.name} in ${guild.name}`);
            }else{
                if(player.voiceChannel.id === authorVoiceChannel.id){
                    message.channel.send('I am already in your voice channel.');

                }else{
                    message.channel.send('I am already in a voice channel.');
                }
            }
        }else{
            message.channel.send('You need to be in a voice channel first.');
        }
    }
}