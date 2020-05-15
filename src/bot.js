require('dotenv').config();
const StateManager = require('../src/utils/StateManager');
const {ErelaClient} = require('erela.js');
const {Client} = require('discord.js');
const client = new Client();
const {registerCommands, registerEvents, registerMusicEvents} = require('./utils/register');




(async ()=>{
    client.commands = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    // await registerMusicEvents(client, '../musicevents');
    await client.login(process.env.BOT_TOKEN);
    client.music = new ErelaClient(client, [
        {
            host: process.env.HOST,
            port: process.env.PORT,
            password: process.env.PASSWORD
        }
    ]);
    await registerMusicEvents(client.music, '../musicevents');
})();