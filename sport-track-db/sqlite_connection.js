const sqlite3 = require('sqlite3').verbose();

// Chemin vers la base de données SQLite
<<<<<<< HEAD
 const dbPath = '../sporttrack_db.db';
=======
const dbPath = '../sporttrack_db.db';
>>>>>>> d5d9b9eda635531c836cf3ab79fcde4b1a4c9529

// Créer une nouvelle instance de la base de données SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err.message);
    } else {
        console.log('Connexion à la base de données SQLite établie.');
    }
});

// Exporter l'objet de base de données SQLite
module.exports = db;