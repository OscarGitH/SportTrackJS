var express = require('express');
var router = express.Router();
var session = require('express-session');
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;

router.get('/', function (req, res, next) {
    // Vérifiez si l'utilisateur est connecté (utilisation de la variable de session)
    if (req.session.userId) {
        // Supprimez la variable d'environnement qui identifie l'utilisateur
        delete req.session.userId;

        // Détruisez la session utilisateur
        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
            }

            // Redirigez l'utilisateur vers une page de déconnexion réussie ou une autre page de votre choix
            res.redirect('connect');
        });
    } else {
        res.redirect('connect');
        res.status(401).send('Vous devez être connecté pour vous déconnecter');
    }
});

module.exports = router;
    