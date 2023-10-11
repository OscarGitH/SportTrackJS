var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
router.get('/', async function(req, res, next) {
  try {
    const users = await user_dao.findAll();
    res.render('users', { data: users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});
module.exports = router;