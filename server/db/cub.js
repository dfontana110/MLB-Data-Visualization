const Sequelize = require('sequelize');
const db = require('./database');

const Cub = db.define('Cub', {
  year: {
    type: Sequelize.INTEGER,
  },
  PA: {
    type: Sequelize.INTEGER,
  },
  AB: {
    type: Sequelize.INTEGER,
  },
  H: {
    type: Sequelize.INTEGER,
  },
  HR: {
    type: Sequelize.INTEGER,
  },
  BB: {
    type: Sequelize.INTEGER,
  },
  SO: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cub;
