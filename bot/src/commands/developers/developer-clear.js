const { REST, Routes } = require('discord.js');
const chalk = require("chalk");

module.exports = {
    name: 'developer-clear',
    description: "Testing!",
    devOnly: true,
    testOnly: true,
    // options: Object[],
    // deleted: true,
  
    callback: async (client, interaction) => {

      const rest = new REST().setToken(process.env.TOKEN);
      
      rest.put(Routes.applicationCommands('996195602473959514'), { body: [] })
      .then(() => console.log('Successfully deleted all application commands.'))
      .catch(console.error);

    },
  };