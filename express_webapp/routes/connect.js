var express = require('express');
var router = express.Router();
var session = require('express-session');
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;

// Configuration de la session
router.use(session({
    secret: 'O6u9yRX0XkK2D6e8FnLtRs4C7DIs3Xit42ebg5OpWY0',
    resave: false,
    saveUninitialized: true
}));


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
    console.log(email, password);
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
            res.status(200).send('Utilisateur connecté avec succès');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
    }
});

module.exports = router;