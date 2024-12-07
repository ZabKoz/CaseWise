require('dotenv').config();
const { Client, IntentsBitField, Collection } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const languageHandler = require('./handlers/languageHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.guildSettings = new Collection();
client.languages = new Collection();
client.embedColors = require('./database/configuration/embedColors.json');
client.emoji = require('./database/configuration/emojis.json');

eventHandler(client);
languageHandler(client);

client.login(process.env.TOKEN);