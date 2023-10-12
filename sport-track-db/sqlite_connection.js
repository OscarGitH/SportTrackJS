const sqlite3 = require('sqlite3').verbose();

// Chemin vers la base de données SQLite
const dbPath = '../sporttrack_db.db';

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