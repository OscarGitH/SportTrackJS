var express = require('express');
var session = require('express-session');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

// GET /myaccount recupere les informations de l'utilisateur connecté
router.get('/', async function(req, res, next) {
    socker = req.session;
    try {
      // Renvoie les informations de l'utilisateur à la vue
      res.render('profilEdit', {userId: socker.userId});
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    }
  });
  
// POST /myaccount met à jour les informations de l'utilisateur connecté
router.post('/', async function(req, res, next) {
    const userData = req.body;
    socker = req.session;
    try {
      // Vérification que l'adresse e-mail de l'utilisateur est unique (sauf si elle est celle de l'utilisateur connecté)
      const existingUser = await user_dao.findByEmail(userData.email);
      if (existingUser && existingUser.userId !== socker.userId.userId) {
        res.redirect('/update_error');
        return;
      }
  
      // Mise à jour de l'utilisateur en utilisant la classe UserDAO
      try {
        // On crée le nouvel objet utilisateur
        const sessionPassword = socker.userId.password;

        const updatedUser = {
          userId: socker.userId.userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          birthDate: userData.birthDate,
          height: userData.height,
          weight: userData.weight,
          gender: userData.gender,
          password: sessionPassword
        };

        
        // On met à jour l'utilisateur
        try {
          await user_dao.update(updatedUser);
          // On met à jour les informations de session
          socker.userId = updatedUser;
          res.redirect('/myaccount');
        } catch (error) {
          console.error(error);
          res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
        }

      } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
    }
  });

module.exports = router;