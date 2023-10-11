// Importer les modules nécessaires
var db = require('./sport-track-db').db;
var user_dao = require('./sport-track-db').user_dao;
var activity_dao = require('./sport-track-db').activity_dao;

// Nettoyer la base de données avant les tests
activity_dao.deleteAll();
user_dao.deleteAll();
console.log('Base de données nettoyée.');

async function runTests() {
    try {
        // Cas de test pour l'insertion d'un utilisateur
        const newUser = {
            lastName: 'Doe',
            firstName: 'John',
            birthDate: '1990-01-01',
            gender: 'M',
            height: 180.0,
            weight: 75.0,
            email: 'janesmith1@example.com',
            password: 'password123'
        };

        const userId = await user_dao.insert(newUser);
        console.log('Nouvel utilisateur ajouté avec succès, ID:', userId);

        // Cas de test pour la mise à jour d'un utilisateur
        const updatedUser = {
            lastName: 'Smith',
            firstName: 'Jane',
            birthDate: '1985-05-15',
            gender: 'F',
            height: 165.5,
            weight: 60.0,
            email: 'janesmith1@example.com',
            password: 'newpassword'
        };

        const updateUserMessage = await user_dao.update(1, updatedUser);
        console.log(updateUserMessage);

        // Cas de test pour la recherche d'utilisateur par ID
        const foundUser = await user_dao.findByKey(1);
        console.log('Utilisateur trouvé par ID:', foundUser);

        // Données de test pour l'insertion d'une activité
        const testData = {
            userId: 1,
            date: '2023-10-09',
            description: 'Test Activity',
            time: '01:30:00',
            distance: '10.5',
            averageSpeed: '7.0',
            maxSpeed: '12.0',
            totalAltitude: '250',
            averageHeartRate: 80,
            maxHeartRate: 160,
            minHeartRate: 60
        };

        // Cas de test pour l'insertion d'une activité
        await activity_dao.insert(testData);
        console.log('Nouvelle activité ajoutée avec succès, ID:');

        // Cas de test pour la mise à jour d'une activité
        const updatedActivity = {
            date: '2023-09-10',
            description: 'Test Activity update',
            time: '02:29:00',
            distance: '10.5',
            averageSpeed: '7.0',
            maxSpeed: '12.0',
            totalAltitude: '250',
            averageHeartRate: 80,
            maxHeartRate: 160,
            minHeartRate: 60
        };

        const updateActiMessage = await activity_dao.update(1, updatedActivity);
        console.log(updateActiMessage);

        // Cas de test pour la recherche d'activité par ID
        await activity_dao.find(1);
        console.log('Activité trouvée par ID:');

        // Cas de test pour la suppression d'un utilisateur
        const deleteMessage = await user_dao.delete(1);
        console.log(deleteMessage);

        // Cas de test pour la suppression d'une activité
        await activity_dao.delete(1);

        // Fermer la connexion à la base de données après les tests
        db.close((err) => {
            if (err) {
                console.error('Erreur lors de la fermeture de la base de données :', err.message);
            } else {
                console.log('Connexion à la base de données SQLite fermée.');
            }
        });

    } catch (err) {
        console.error('Une erreur s\'est produite :', err);
    }
}

// Exécuter les tests
runTests();