const { EmbedBuilder } = require("discord.js");
const translateText = require('../../utils/text/translator');

module.exports = {
  name: "example",
  description: '!',
  description_localizations: {
    "cs": "!",
    "de": "!",
    "pl": "!",
  },
  callback: async (client, interaction) => {
    // Gathering data on what language to use.
    const lang = await translateText(client, interaction);

  },
};
