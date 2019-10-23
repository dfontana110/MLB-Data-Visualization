const express = require('express');
const Cub = require('../db/cub');
const router = express.Router();

// GET all seasons

router.get('/', async (req, res, next) => {
  try {
    res.json(
      await Cub.findAll({
        order: [['year', 'ASC']],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.get('/:year', async (req, res, next) => {
  try {
    const season = await Cub.findOne({
      where: {
        year: req.params.year,
      },
    });
    season ? res.json(season) : res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

//
