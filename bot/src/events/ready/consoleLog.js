const chalk = require('chalk');

module.exports = (client) => {
  console.log(
    chalk.gray("[" + chalk.blue("SYSTEM") + "]"), chalk.gray(`I was logged in as a user:`), chalk.white(`${client.user.tag}`)
  );
};