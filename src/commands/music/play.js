const BaseCommand = require('../../utils/structure/BaseCommand');
const {MessageEmbed} = require('discord.js');
module.exports = class PlayCommand extends BaseCommand{
    constructor(){
        super('play', 'music', []);
    }

    async run(client, message, args){
        if(args[0]){
                const query = args.join(' ');
            const authorVoice = message.member.voice;
            if(authorVoice){
                const player = client.music.players.get(message.guild.id);
                if (player){
                    if(authorVoice.channel.id === player.voiceChannel.id){
                        let i = 0;
                        const searchResults = await client.music.search(query, message.author);
                        const tracks = searchResults.tracks.slice(0,10);
                        const tracksInfo = tracks.map(track=>`${++i}. ${track.title} - \n${track.uri}`).join('\n');
                        // console.log(tracksInfo);
                        const embed = new MessageEmbed()
                            .setAuthor(client.user.tag, client.user.displayAvatarURL())
                            .setDescription(tracksInfo)
                            .setFooter('Music Results');
                        message.channel.send(embed);
                        try{
                            const filter = m => (message.author.id === m.author.id) && (parseInt(m.content) >=1 && parseInt(m.content) <= tracks.length);
                            const response = await message.channel
                                .awaitMessages(filter, {max: 1, time: 60000, errors:['time']});
                        
                            if(response){
                                const entry= response.first().content;
                                
                                const track = tracks[entry-1];
                                player.queue.add(track);
                                if(player.queue.size == 1){
                                    player.play();
                                    return;
                                }
                                message.channel.send(`Enqueueing track ${track.title}`);
                                console.log(`Added a song in queue for ${authorVoice.channel.name} in ${message.guild.name}.`);
                            }
                        } catch(error){
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
        
}   
