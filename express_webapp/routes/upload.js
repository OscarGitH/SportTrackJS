var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
router.get('/', async function(req, res, next) {
  try {
    res.render('upload');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l`upload');
  }
});

router.post('/', async function(req, res, next) {
    /*
  const userData = req.body;
  try {
      // Vérification que l'adresse e-mail de l'utilisateur est unique
      const existingUser = await user_dao.findByEmail(userData.email);
      if (existingUser) {
          return res.status(400).send('L\'adresse e-mail est déjà utilisée.');
      }

      // Création de l'utilisateur en utilisant la classe UserDAO
      try {
          const userId = await user_dao.insert(userData);
          res.status(201).send(`Utilisateur créé avec l'ID avec succès`);
      } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
  }
  */
});

module.exports = router;