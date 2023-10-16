const express = require('express');
const session = require('express-session');
const router = express.Router();
const user_dao = require('../../sport-track-db/sport-track-db').user_dao;

// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));
var socket;
router.get('/', async function (req, res, next) {
    try {
        res.render('connect');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de connexion');
    }
});

router.post('/', async function (req, res, next) {
    const { email, password } = req.body;
    socket = req.session;
    try {
        // Vérification des informations de connexion
        const user = await user_dao.findByEmail(email);
        if (!user) {
            return res.redirect('/connexion_error');
        }

        const userId = await user_dao.connectUserByEmail(email, password);
        if (!userId) {
            return res.redirect('/connexion_error');
        } else {
            // Stockage de l'ID utilisateur dans la session
            socket.userId = userId;
            return res.redirect('/');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la tentative de connexion');
    }
});

module.exports = router;