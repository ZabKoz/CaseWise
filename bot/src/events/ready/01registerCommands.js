const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/commands/areCommandsDifferent");
const getApplicationCommands = require("../../utils/commands/getApplicationCommands");
const getLocalCommands = require("../../utils/commands/getLocalCommands");
const chalk = require("chalk");

module.exports = async (client) => {
  /**
   * Displays information that the System starts loading commands
   */
  console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Loading commands...`);
  //
  try {
    const localCommands = getLocalCommands();
    let applicationCommands
    if (process.env.DEVELOPERMODE === 'true') {
      applicationCommands = await getApplicationCommands(
        client,
        testServer
      );
    } else {
      applicationCommands = await getApplicationCommands(
        client
      );
    };

    for (const localCommand of localCommands) {
      const { name, description, description_localizations, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      /**
       * Displays information that the command has been loaded
       */
      console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `The command has been loaded: ${chalk.white(name)}`));

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          /**
           * Displays information that the command has been removed
           */
          console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Command properly removed: ${chalk.white(name)}`));
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            description_localizations,
            options,
          });

          /**
           * Displays information that the command information has been changed
           */
          console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Command correctly updated: ${chalk.white(name)}`));
        }
      } else {
        if (localCommand.deleted) {
          /**
           * Displays information that the command is skipped 'delete' value set to true
           */
          console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Skipping registering command "${chalk.white(name)}" as it's set to delete.`));
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          description_localizations,
          options,
        });

        /**
         * Displays information that the command has been added
         */
        console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Registered command "${chalk.white(name)}"`));
      }
    }
  } catch (error) {
    /**
     * Displays error information
     */
    console.log(chalk.gray("[" + chalk.red("FAILED") + "]", chalk.red(`There was an error: ${error}`)));
  }
  // Displaying information that commands loading has been completed.
  console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]", chalk.white(`Commands loading completed...`)));
};