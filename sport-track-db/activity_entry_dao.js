const sqlite3 = require('sqlite3').verbose();
const db = require('./sqlite_connection'); // Mettez à jour le chemin vers votre connexion SQLite

class ActivityEntryDAO {
    static addEntry(activityId, heartRate, latitude, longitude, timestamp, callback) {
        const sql = db.prepare("INSERT INTO ActivityEntry (activityId, heartRate, latitude, longitude, timestamp) VALUES (?, ?, ?, ?, ?)");
        sql.run(activityId, heartRate, latitude, longitude, timestamp, function (err) {
            if (err) {
                console.error("Erreur lors de l'ajout de l'entrée :", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                if (typeof callback === 'function') {
                    callback(null, { entryId: this.lastID });
                }
            }
        });
        sql.finalize();
    }

    static updateEntry(entryId, heartRate, latitude, longitude, timestamp, callback) {
        const sql = "UPDATE ActivityEntry SET heartRate = ?, latitude = ?, longitude = ?, timestamp = ? WHERE entryId = ?";
        const params = [heartRate, latitude, longitude, timestamp, entryId];

        db.run(sql, params, function (err) {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'entrée :", err.message);
                if (typeof callback === 'function') {
                    callback(err);
                }
            } else {
                if (typeof callback === 'function') {
                    callback(null);
                }
            }
        });
    }

    static deleteEntry(entryId, callback) {
        const sql = db.prepare("DELETE FROM ActivityEntry WHERE entryId = ?");
        sql.run(entryId, function (err) {
            if (err) {
                console.error("Erreur lors de la suppression de l'entrée :", err.message);
                if (typeof callback === 'function') {
                    callback(err);
                }
            } else {
                if (typeof callback === 'function') {
                    callback(null);
                }
            }
        });
        sql.finalize();
    }

    static getAllEntries(callback) {
        const sql = "SELECT * FROM ActivityEntry";
        db.all(sql, [], function (err, rows) {
            if (err) {
                console.error("Erreur lors de la récupération de toutes les entrées :", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                const entries = rows.map(row => ({
                    entryId: row.entryId,
                    activityId: row.activityId,
                    heartRate: row.heartRate,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    timestamp: row.timestamp
                }));
                if (typeof callback === 'function') {
                    callback(null, entries);
                }
            }
        });
    }

    static getEntriesByActivity(activityId, callback) {
        const sql = db.prepare("SELECT * FROM ActivityEntry WHERE activityId = ?");
        sql.all(activityId, function (err, rows) {
            if (err) {
                console.error("Erreur lors de la récupération des entrées pour une activité spécifique :", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                const entries = rows.map(row => ({
                    entryId: row.entryId,
                    activityId: row.activityId,
                    heartRate: row.heartRate,
                    latitude: row.latitude,
                    longitude: row.longitude,
                    timestamp: row.timestamp
                }));
                if (typeof callback === 'function') {
                    callback(null, entries);
                }
            }
        });
        sql.finalize();
    }
}

module.exports = ActivityEntryDAO;