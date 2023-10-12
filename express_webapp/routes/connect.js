var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;

router.get('/', async function (req, res, next) {
    try {
        res.render('connect');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur pour ajouter un utilisateur');
    }
});

router.post('/', async function (req, res, next) {
    const { email, password } = req.body;
    try {
        // Vérification des informations de connexion
        const user = await user_dao.findByEmail(email);
        if (!user) {
            return res.status(400).send('L\'adresse e-mail est incorrecte.');
        }

        const userId = await user_dao.connectUserByEmail(email, password);
        if (!userId) {
            return res.status(400).send('Le mot de passe est incorrect.');
        } else {
            // Stockage de l'ID utilisateur dans la session
            req.session.userId = userId;
            res.redirect('/');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
    }
});

module.exports = router;