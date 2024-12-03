const chalk = require("chalk");
const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    // Display of information about the start of charging.
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Loading Languages...`);
    // Selecting the path to the folder.
    const foldersPath = path.join(__dirname, '../database/languages');
    // Loading files from a “../database/languages” folder with a “.json” suffix.
    const languageFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.json'));
    // The loop responsible for loading files.
    for (const file of languageFiles) {
        // Downloading a file from the folder “../database/languages”.
        const lang = require(`../database/languages/${file}`);
        // Setting the language in the collection “languages”.
        client.languages.set(lang.short_name, lang);
        // Display what language has been added.
        console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Language has been loaded:`, chalk.white(lang.long_name)));
    };
    // Displaying information that language loading has been completed.
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]", chalk.white(`Language loading completed...`)));
}