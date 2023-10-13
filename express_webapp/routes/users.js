var express = require('express');
var session = require('express-session');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));


router.get('/', async function(req, res, next) {
    socker = req.session;

    try {
    res.render('users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur pour ajouter un utilisateur');
  }
});

router.post('/', async function(req, res, next) {
  const userData = req.body;
  try {
      // Vérification que l'adresse e-mail de l'utilisateur est unique
      const existingUser = await user_dao.findByEmail(userData.email);
      if (existingUser) {
          return res.status(400).send('L\'adresse e-mail est déjà utilisée.');
      }

      // Création de l'utilisateur en utilisant la classe UserDAO
      try {
          await user_dao.insert(userData);
          // Sauvegardez ici l'ID de l'utilisateur dans la session
          socker.userId = userData.id;

          res.redirect('/');
      } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
  }
});

module.exports = router;