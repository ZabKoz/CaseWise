const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = async (client) => {
  console.log(
    chalk.gray("[" + chalk.blue("SYSTEM") + "]"), `Start a connection to the database...`
  );

  // Connect to MongoDB
  await mongoose
    .connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        chalk.gray(
          "[" + chalk.green("  OK  ") + "]", `Connected to the database`
        )
      );
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", {
        error: err.message || null,
        stack: err.stack || null,
      });

      process.exit(1);
    });
};
