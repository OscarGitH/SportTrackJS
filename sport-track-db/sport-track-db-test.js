var user_dao = require('./sport-track-db').user_dao;
var db = require('./sport-track-db').db;

async function runTests() {
    try {
        // Nettoyer la base de données avant les tests
        await user_dao.deleteAll();

        // Cas normal : Insertion d'un utilisateur
        const newUser = {
            lastName: 'Doe',
            firstName: 'John',
            birthDate: '1990-01-01',
            gender: 'M',
            height: 180.0,
            weight: 75.0,
            email: 'johndoe1@example.com',
            password: 'password123'
        };

        const userId = await user_dao.insert(newUser);
        console.log('Nouvel utilisateur ajouté avec succès, ID:', userId);

        // Cas de mise à jour d'un utilisateur
        const updatedUser = {
            lastName: 'Smith',
            firstName: 'Jane',
            birthDate: '1985-05-15',
            gender: 'F',
            height: 165.5,
            weight: 60.0,
            email: 'janesmith@example.com',
            password: 'newpassword'
        };

        const updateMessage = await user_dao.update(1, updatedUser);
        console.log(updateMessage);

        // Cas de recherche d'utilisateur par ID
        const foundUser = await user_dao.findByKey(1);
        console.log('Utilisateur trouvé par ID:', foundUser);

        // Cas pour suppression d'un utilisateur
        const deleteMessage = await user_dao.delete(1);
        console.log(deleteMessage);



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

runTests();