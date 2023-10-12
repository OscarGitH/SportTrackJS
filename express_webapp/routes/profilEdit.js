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
    res.render('profilEdit');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur pour modifier le profil');
  }
});

router.post('/', async function(req, res, next) {
    const userData = req.body;
  
    try {
      const sessionUserId = req.session.socker ;
      // Vérification du format de l'adresse e-mail
      if (!validateEmail(userData.email)) {
        // L'adresse e-mail n'est pas au bon format
        return res.redirect('/modif_invalid');
      }
  
      // Vérifiez si un utilisateur autre que l'utilisateur actuel existe déjà avec la même adresse e-mail
      const existingUser = await user_dao.findByEmail(userData.email);
  
      if (existingUser && existingUser.socker !== sessionUserId) {
        // Un utilisateur avec la même adresse e-mail existe déjà
        return res.redirect('/modif_invalid');
      }
  
      // Créez un objet User avec les nouvelles informations
      const updatedUser = {
        userId: sessionUserId,
        lastName: userData.lastName,
        firstName: userData.firstName,
        birthDate: userData.birthDate,
        gender: userData.gender,
        height: userData.height,
        weight: userData.weight,
        email: userData.email,
        password: sessionPassword, // Supposons que vous stockiez le mot de passe dans la session
      };
  
     try {
        // Mettez à jour l'utilisateur en utilisant la méthode d'update de la classe user_dao
        await user_dao.update(sessionUserId, updatedUser);
        res.status(200).send('Utilisateur mis à jour avec succès');
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