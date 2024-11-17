const guildSchema = require('../../database/models/GuildSchema');

const translateText = async function (client, interaction) {

  guildData = await guildSchema.findOne({ guildId: interaction.guild.id });

  const languageData = await client.languages.get(guildData.language);

  const jsonLanguage = require(`../../database/languages/${languageData.short_name}`);

  const text = await jsonLanguage;

  return text;

};

module.exports = translateText;