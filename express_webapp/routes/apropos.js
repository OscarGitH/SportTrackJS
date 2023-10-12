const express = require('express');
const session = require('express-session');
const router = express.Router();
const user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

router.get('/', async function (req, res, next) {
    socker = req.session;
    try {
        if (session.userId) {
            res.render('apropos', { userId: session.userId });
        } else {
            res.render('apropos', { userId: null }); // Vous pouvez ajuster le cas où l'utilisateur n'est pas connecté
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de apropos');
    }
});

module.exports = router;