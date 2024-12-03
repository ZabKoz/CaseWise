const path = require("path");
const chalk = require("chalk");
const getAllFiles = require("../utils/files/getAllFiles");

module.exports = (client) => {
  // Display of information about the start of charging.
  console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Loading events...`);
  // Selecting the path to the folder.
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);
  //
  for (const eventFolder of eventFolders) {
    //
    const eventFiles = getAllFiles(eventFolder);
    //
    eventFiles.sort((a, b) => a > b);
    //
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    //
    console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `The command has been loaded: ${ chalk.white(eventName)}`));
    //
    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
};