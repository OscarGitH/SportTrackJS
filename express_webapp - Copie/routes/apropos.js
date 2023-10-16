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
        res.render('apropos',{userId: socker.userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de apropos');
    }
});

module.exports = router;