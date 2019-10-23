const { green, red } = require('chalk');
const rp = require('request-promise');
const cheerio = require('cheerio');
const { db, Cub } = require('./server/db');
let url = 'https://www.baseball-reference.com/teams/CHC/batteam.shtml';

const seed = rp(url)
  .then(function(html) {
    let year = 2019;
    const seasons = [];
    const $ = cheerio.load(html);
    const rows = $('tbody tr:not(.thead)');
    rows.each((index, row) => {
      const season = {};

      const getAttrVal = (singleSeason, aStat, attr) => {
        if ($(aStat).attr('data-stat') === attr) {
          singleSeason[attr] = Number($(aStat).text());
        }
      };

      $(row)
        .find('td')
        .each((index, stat) => {
          season.year = year;
          getAttrVal(season, stat, 'PA');
          getAttrVal(season, stat, 'AB');
          getAttrVal(season, stat, 'H');
          getAttrVal(season, stat, 'HR');
          getAttrVal(season, stat, 'BB');
          getAttrVal(season, stat, 'SO');
        });
      if (seasons.length < 100) {
        seasons.push(season);
        year--;
      }
    });
    return seasons;
  })
  .then(async seasons => {
    try {
      await Promise.all(
        seasons.map(season => {
          return Cub.create(season);
        })
      );
      // await db.sync({ force: true });
      console.log(green('done seeding!'));
    } catch (err) {
      console.log(err);
    }
  });

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)

// if (require.main === module) {
//   seed()
//     .then(() => {
//       console.log(green('Seeding success!'));
//       db.close();
//     })
//     .catch(err => {
//       console.error(red('Oh noes! Something went wrong!'));
//       console.error(err);
//       db.close();
//     });
// }

const teams = [
  'ARI',
  'ATL',
  'BAL',
  'BOS',
  'CHC',
  'CHW',
  'CIN',
  'CLE',
  'COL',
  'DET',
  'HOU',
  'KCR',
  'ANA',
  'LAD',
  'FLA',
  'MIL',
  'MIN',
  'NYM',
  'NYY',
  'OAK',
  'PHI',
  'PIT',
  'SDP',
  'SFG',
  'SEA',
  'STL',
  'TBD',
  'TEX',
  'TOR',
  'WSN',
];
