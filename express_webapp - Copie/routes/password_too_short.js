const express = require('express');
const session = require('express-session');
const router = express.Router();

var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

router.get('/', async function (req, res, next) {
    socker = req.session;
    try {
        res.render('password_too_short');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de password_too_short');
    }
}
);

module.exports = router;