// const Cub = require('./server/db/cub');
const rp = require('request-promise');
const cheerio = require('cheerio');
let url = 'https://www.baseball-reference.com/teams/CHC/batteam.shtml';

rp(url).then(function(html) {
  let year = 2019;
  const stats = [];
  const $ = cheerio.load(html);
  const rows = $('tbody tr');
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
    if (stats.length < 25) {
      stats.push(season);
      year--;
    }
    if (stats.length === 25) {
      console.log('stats:', stats);
      return stats;
    }
  });
});

// rp(url)
// .then(function(html) {
//   const players = [];
//   const $ = cheerio.load(html);
//   const playerRows = $('#team_batting tbody tr:not(.thead)');

//   playerRows.each((index, row) => {
//     const singlePlayer = {};

//     const getAttrVal = (player, aStat, attr) => {
//       if ($(aStat).attr('data-stat') === attr) {
//         player[attr] = Number($(aStat).text());
//       }
//     };

//     $(row)
//       .find('td')
//       .each((index, stat) => {
//         if ($(stat).attr('data-stat') === 'player') {
//           let name = $(stat).text();
//           let lastChar = name[name.length - 1];

//           if (lastChar === '*' || lastChar === '#') {
//             name = name.slice(0, -1);
//           }
//           singlePlayer.player = name;
//         }
//         singlePlayer.year = year;
//         getAttrVal(singlePlayer, stat, 'age');
//         getAttrVal(singlePlayer, stat, 'PA');
//         getAttrVal(singlePlayer, stat, 'AB');
//         getAttrVal(singlePlayer, stat, 'H');
//         getAttrVal(singlePlayer, stat, 'HR');
//         // getAttrVal(singlePlayer, stat, 'RBI');
//         // getAttrVal(singlePlayer, stat, 'SB');
//         // getAttrVal(singlePlayer, stat, 'CS');
//         getAttrVal(singlePlayer, stat, 'BB');
//         getAttrVal(singlePlayer, stat, 'SO');
//         getAttrVal(singlePlayer, stat, 'GIDP');
//         // if ($(stat).attr('data-stat') === 'age') {
//         //   singlePlayer.age = Number($(stat).text());
//         // }
//       });
//     if (players.length < 20) {
//       players.push(singlePlayer);
//     }
//   });
//   return players;
// })

// .then(async players => {
//   try {
//     await db.sync({ force: true });
//     await Promise.all(
//       players.map(player => {
//         return Stat.create(player);
//       })
//     );
//   } catch (err) {
//     console.error(err);
//   }
// })
// .catch(function(err) {
//   console.log(err);
// });
