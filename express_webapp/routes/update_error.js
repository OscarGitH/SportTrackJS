const express = require('express');
const session = require('express-session');
const router = express.Router();

var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

router.get('/', async function (req, res, next) {
    socker = req.session;
    try {
        res.render('update_error');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de update_error');
    }
}
);

module.exports = router;