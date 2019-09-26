const rp = require('request-promise');
const cheerio = require('cheerio');
// const url = `https://www.baseball-reference.com/teams/CHC/2010.shtml`;
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/Cubs', { logging: false });

let url = `https://www.baseball-reference.com/teams/CHC/${year}.shtml`;

const Stat = db.define('stat', {
  year: {
    type: Sequelize.INTEGER,
  },
  player: {
    type: Sequelize.STRING,
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

rp(url)
  .then(function(html) {
    const players = [];
    const $ = cheerio.load(html);
    const playerRows = $('#team_batting tbody tr:not(.thead)');

    playerRows.each((index, row) => {
      const singlePlayer = {};

      const getAttrVal = (player, aStat, attr) => {
        if ($(aStat).attr('data-stat') === attr) {
          player[attr] = Number($(aStat).text());
        }
      };

      $(row)
        .find('td')
        .each((index, stat) => {
          if ($(stat).attr('data-stat') === 'player') {
            let name = $(stat).text();
            let lastChar = name[name.length - 1];

            if (lastChar === '*' || lastChar === '#') {
              name = name.slice(0, -1);
            }
            singlePlayer.player = name;
          }
          singlePlayer.year = year;
          getAttrVal(singlePlayer, stat, 'age');
          getAttrVal(singlePlayer, stat, 'PA');
          getAttrVal(singlePlayer, stat, 'AB');
          getAttrVal(singlePlayer, stat, 'H');
          getAttrVal(singlePlayer, stat, 'HR');
          // getAttrVal(singlePlayer, stat, 'RBI');
          // getAttrVal(singlePlayer, stat, 'SB');
          // getAttrVal(singlePlayer, stat, 'CS');
          getAttrVal(singlePlayer, stat, 'BB');
          getAttrVal(singlePlayer, stat, 'SO');
          getAttrVal(singlePlayer, stat, 'GIDP');
          // if ($(stat).attr('data-stat') === 'age') {
          //   singlePlayer.age = Number($(stat).text());
          // }
        });
      if (players.length < 20) {
        players.push(singlePlayer);
      }
    });
    return players;
  })

  .then(async players => {
    try {
      await db.sync({ force: true });
      await Promise.all(
        players.map(player => {
          return Stat.create(player);
        })
      );
    } catch (err) {
      console.error(err);
    }
  })
  .catch(function(err) {
    console.log(err);
  });

let url = 'https://www.baseball-reference.com/teams/CHC/batteam.shtml';
