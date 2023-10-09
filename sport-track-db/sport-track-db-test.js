var user_dao = require('./sport-track-db').user_dao;
var db = require('./sport-track-db').db;

// Cas normal : Insertion d'un utilisateur
const newUser = {
    lastName: 'Doe',
    firstName: 'John',
    birthDate: '1990-01-01',
    gender: 'M',
    height: 180.0, // Assurez-vous que les valeurs numériques utilisent un point décimal
    weight: 75.0,  // Assurez-vous que les valeurs numériques utilisent un point décimal
    email: 'johndoe3@example.com',
    password: 'password123'
};

user_dao.insert(newUser, (err, userId) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
            return;
        }
        console.log('Nouvel utilisateur ajouté avec succès, ID:');
    });

// Vous pouvez ajouter d'autres cas de test ici

// Fermer la connexion à la base de données après les tests
db.close((err) => {
    if (err) {
        console.error('Erreur lors de la fermeture de la base de données :', err.message);
    } else {
        console.log('Connexion à la base de données SQLite fermée.');
    }
});
