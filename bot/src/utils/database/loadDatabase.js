const guildSchema = require('../../database/models/GuildSchema');
const chalk = require('chalk');

async function loadDatabase(client) {
    //
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Start loading server configurations...`);
    //
    client.guilds.cache.map(async g => {
        try {
            //
            let guildData = await guildSchema.findOne({ guildId: g.id });
            //
            if (!guildData) {
                //
                guildData = new guildSchema({
                    guildId: g.id
                }).save();
                client.guildSettings.set(g.id, guildData);
                //
                console.log(chalk.gray("[" + chalk.green("  OK  ") + "]"), chalk.gray(`A new configuration for the server has been added:`), g.name);
            }
            else {
                //
                client.guildSettings.set(g.id, guildData);
                console.log(chalk.gray("[" + chalk.green("  OK  ") + "]"), chalk.gray(`Server configuration loaded:`), g.name);
            }
        }
        catch (error) {
            console.log(chalk.gray("[" + chalk.red("FAILED") + "]", chalk.red(`There was an error: ${error}`)));
        }
    });
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Server configuration loading completed...`);
};

module.exports.loadDatabase = loadDatabase;