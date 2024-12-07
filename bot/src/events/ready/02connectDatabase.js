const chalk = require('chalk');
const mongoose = require('mongoose');
const { loadDatabase } = require('../../utils/database/loadDatabase');

module.exports = async (client) => {
  // Display information about the start of the connection to the database.
  console.log(chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Start a connection to the database...`);
  // Connect to MongoDB
  await mongoose
    .connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      // Display information about the connection to the database
      console.log(chalk.gray("[" + chalk.green("  OK  ") + "]", `Connected to the database`));
      loadDatabase(client)
    })
    .catch((err) => {
      // Displaying database connection error information
      console.error("Error connecting to MongoDB", {
        error: err.message || null,
        stack: err.stack || null,
      });
      process.exit(1);
    });
};