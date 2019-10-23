const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');

// const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
console.log(chalk.yellow(`Opening database connection to stackathon`));

const db = new Sequelize(`postgres://localhost:5432/stackathon`, {
  logging: false,
  operatorsAliases: false,
});

module.exports = db;
