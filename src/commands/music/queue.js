const BaseCommand = require('../../utils/structure/BaseCommand');
const {MessageEmbed} =require('discord.js')
module.exports = class QueueComamnd extends BaseCommand{
    constructor(){
        super('queue', 'music', [])
    }

    async run (client, message, args){
        const guildId = message.guild.id;
        const player = client.music.players.get(guildId);
        const authorVoice = message.member.voice;
        if(authorVoice){
            if(player){
                if(player.voiceChannel.id === authorVoice.channelID){
                    let currentPage = 0;
                    const embeds = generateQueue(player.queue);
                    const queueEmbed = await message.channel.send(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                    await queueEmbed.react('⬅️');
                    await queueEmbed.react('➡️');
                    
                    const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id);
                    const collector = queueEmbed.createReactionCollector(filter,{time: 660000 });
                    
                    collector.on('collect', (reaction, user)=>{
                        if(reaction.emoji.name === '➡️'){
                            if(currentPage< embeds.length-1){
                                currentPage++;
                                queueEmbed.edit(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                            }
                        }else if(reaction.emoji.name === '⬅️'){
                            if(currentPage != 0){
                                --currentPage;
                                queueEmbed.edit(`Current page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
                            }
                        }
                    });
                    collector.on('end', ()=>queueEmbed.delete());
                    
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

function generateQueue(queue){
    
    const embeds = [];
    let k=10;
    let j =0;
    for(let i =0; i< queue.length; i+=10){
        const current = queue.slice(i,k);
        k+=10;
        
        const info = current.map(track=>`${++j}. [${track.title}](${track.uri})`).join('\n');
        const embed = new MessageEmbed()
            .setDescription(`Current Song: **[${queue[0].title}](${queue[0].uri})**\n${info}`);
        embeds.push(embed);
    }
    return embeds;
}