var express = require('express');
var session = require('express-session');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

// GET /users
router.get('/', async function(req, res, next) {
    socker = req.session;

    try {
        res.render('users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur pour ajouter un utilisateur');
    }
});

router.post('/', async function(req, res, next) {
    const userData = req.body;
    socket = req.session;
    try {
        // Vérification que l'adresse e-mail de l'utilisateur est unique
        const existingUser = await user_dao.findByEmail(userData.email);
        if (existingUser) {
            return res.status(400).send('L\'adresse e-mail est déjà utilisée.');
        }

        // Création de l'utilisateur en utilisant la classe UserDAO
        try {
            await user_dao.insert(userData);
            // res.status(201).send(`Utilisateur créé avec l'ID avec succès`);
            try {
                // Vérification des informations de connexion
                const user = await user_dao.findByEmail(userData.email);
                if (!user) {
                    return res.status(400).send("L'adresse e-mail est incorrecte.");
                }

                const userId = await user_dao.connectUserByEmail(user.email, user.password);
                if (!userId) {
                    return res.status(400).send('Le mot de passe est incorrect.');
                } else {
                    // Stockage de l'ID utilisateur dans la session
                    socket.userId = userId;
                    res.redirect('/');
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Erreur lors de la tentative de connexion');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
    }
});

module.exports = router;