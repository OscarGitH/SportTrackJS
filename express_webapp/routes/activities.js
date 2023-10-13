var express = require('express');
const session = require('express-session');
var router = express.Router();
var socker;
var activity_dao = require('../../sport-track-db/sport-track-db').activity_dao;

// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

// GET /activities
router.get('/', async function (req, res, next) {
    try {
        socker = req.session; // Assign req.session to socker
        if (!socker.userId) {
            return res.status(400).send("Vous n'êtes pas connecté.");
        }
        // Récupération de l'ID utilisateur depuis la session
        const userId = socker.userId.userId;
        // Récupération des activités de l'utilisateur
        const activities = await activity_dao.findByIdUser(userId);
        res.render('activities', { activities: activities });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des activités');
    }
});



// POST /activities
router.post('/', async function (req, res, next) {
    const activityData = req.body;

    try {
        if (!socker.userId) {
            return res.status(400).send("Vous n'êtes pas connecté.");
        }
        // Récupération de l'ID utilisateur depuis la session
        const userId = socker.userId;
        // Création d'un objet Activity avec les données envoyées par le formulaire
        const activity = {
            userId: userId,
            date: activityData.date,
            description: activityData.description,
            time: activityData.time,
            distance: activityData.distance,
            averageSpeed: activityData.averageSpeed,
            maxSpeed: activityData.maxSpeed,
            totalAltitude: activityData.totalAltitude,
            averageHeartRate: activityData.averageHeartRate,
            maxHeartRate: activityData.maxHeartRate,
            minHeartRate: activityData.minHeartRate
        };

        // Ajout de l'activité en utilisant la méthode d'insertion de la classe activity_dao
        await activity_dao.insert(activity);
        res.status(200).send('Activité ajoutée avec succès');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'ajout de l\'activité');
    }
});

module.exports = router;