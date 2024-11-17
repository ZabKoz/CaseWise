const chalk = require("chalk");
const path = require('path');
const fs = require('fs');

module.exports = (client) => {
    //
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Loading Languages...`);
    // 
    const foldersPath = path.join(__dirname, '../database/languages');
    // 
    const languageFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.json'));
    // 
    for (const file of languageFiles) {
        // 
        const lang = require(`../database/languages/${file}`);
        // 
        client.languages.set(lang.short_name, lang);
        // 
        console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Language has been loaded:`, chalk.white(lang.long_name)));
    }
    // 
    console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]" + chalk.white(`Language loading completed...`)));
}