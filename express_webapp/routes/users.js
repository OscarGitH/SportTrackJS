var express = require('express');
var session = require('express-session');
var router = express.Router();
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socket;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

// GET /users
router.get('/', async function(req, res, next) {
    socket = req.session;

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
            res.redirect('/not_unique_email');
            return;
        }

        // Création de l'utilisateur en utilisant la classe UserDAO
        try {
            // si le mot de passe fais moins de 6 caractères on renvoie une erreur
            if (userData.password.length < 6) {
                res.redirect('/password_too_short');
                return;
            }

            // si l'adresse mail ne contient ni @ ni . on renvoie une erreur
            if (!userData.email.includes('@') || !userData.email.includes('.')) {
                res.redirect('/email_invalid');
                return;
            }

            // On crée le nouvel objet utilisateur
            const User = {
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                birthDate: userData.birthDate,
                height: userData.height,
                weight: userData.weight,
                gender: userData.gender,
                password: userData.password
            };

            // On ajoute l'utilisateur
            try {
                await user_dao.insert(User);
                // On recupere l'id de l'utilisateur pour le mettre dans la session
                const user = await user_dao.findByEmail(userData.email);
                
                // On met à jour les informations de session
                socket.userId = user;

                res.redirect('/');
            } catch (error) {
                console.error(error);
                res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur1');
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur2');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
    }
});

module.exports = router;