const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const chalk = require("chalk");

module.exports = async (client) => {
  /**
   * Displays information that the System starts loading commands
   */
  console.log(
    chalk.gray("[" + chalk.blue("SYSTEM") + "]"),
    `Loading commands...`
  );
  //
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      /**
       * Displays information that the command has been loaded
       */
      console.log(
        chalk.gray(
          "[" + chalk.green("  OK  ") + "]",
          `The command has been loaded: ${name}`
        )
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          /**
           * Displays information that the command has been loaded
           */
          console.log(
            chalk.gray(
              "[" + chalk.green("  OK  ") + "]",
              `Command properly removed: ${name}`
            )
          );
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          /**
           * Displays information that the command information has been changed
           */
          console.log(
            chalk.gray(
              "[" + chalk.green("  OK  ") + "]",
              `Command correctly updated: ${name}`
            )
          );
        }
      } else {
        if (localCommand.deleted) {
          /**
           * Displays information that the command is skipped 'delete' value set to true
           */
          console.log(
            chalk.gray(
              "[" + chalk.green("  OK  ") + "]",
              `Skipping registering command "${name}" as it's set to delete.`
            )
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        /**
         * Displays information that the command has been added
         */
        console.log(
          chalk.gray(
            "[" + chalk.green("  OK  ") + "]",
            `Registered command "${name}"`
          )
        );
      }
    }
  } catch (error) {
    /**
     * Displays error information
     */
    console.log(
      chalk.gray(
        "[" + chalk.red("FAILED") + "]",
        chalk.red(`There was an error: ${error}`)
      )
    );
  }
};
