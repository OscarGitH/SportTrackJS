const sqlite3 = require('sqlite3').verbose();
const db = require('./sqlite_connection');

class ActivityDAO {
    static find(id, callback) {
        const sql = "SELECT * FROM Activity WHERE activityId = ?";

        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static findAll(callback) {
        const sql = "SELECT * FROM Activity";

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    static findByIdUser(idUser, callback) {
        const sql = "SELECT * FROM Activity WHERE userId = ?";

        return new Promise((resolve, reject) => {
            db.all(sql, [idUser], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static findByEmail(email, callback) {
        const sql = "SELECT * FROM Activity WHERE userId = (SELECT userId FROM User WHERE email = ?)";

        return new Promise((resolve, reject) => {
            db.all(sql, [email], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static insert(activity) {
        this.resetAutoIncrement();
        const sql = ('INSERT INTO Activity(userId, date, description, time, distance, averageSpeed, maxSpeed, totalAltitude, averageHeartRate, maxHeartRate, minHeartRate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const values = [
            activity.userId,
            activity.date,
            activity.description,
            activity.time,
            activity.distance,
            activity.averageSpeed,
            activity.maxSpeed,
            activity.totalAltitude,
            activity.averageHeartRate,
            activity.maxHeartRate,
            activity.minHeartRate
        ];
        return new Promise((resolve, reject) => {
            db.run(sql, values, (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion de l\'activité :', err);
                    reject(err); // Rejeter la promesse en cas d'erreur
                } else {
                    console.log('Activité insérée avec succès.');
                    resolve(result); // Résoudre la promesse en cas de succès
                }
            });
        });
    }

    static delete(activityId, callback) {
        const sql = "DELETE FROM Activity WHERE activityId = ?";

        return new Promise((resolve, reject) => {
            db.run(sql, [activityId], function (err) {
                if (err) {
                    console.error("Error deleting activity:", err.message);
                    callback(err);
                } else {
                    resolve(`Activity deleted: ${activityId}`);
                }
            });
        });
    }

    static deleteAll() {
        const sql = "DELETE FROM Activity";

        return new Promise((resolve, reject) => {
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve("All activities deleted.");
                }
            });
        });
    }

    static update(activityId, activity) {
        const sql = "UPDATE Activity SET date = ?, description = ?, time = ?, distance = ?, averageSpeed = ?, maxSpeed = ?, totalAltitude = ?, averageHeartRate = ?, maxHeartRate = ?, minHeartRate = ? WHERE activityId = ?";
        const params = [
            activity.date,
            activity.description,
            activity.time,
            activity.distance,
            activity.averageSpeed,
            activity.maxSpeed,
            activity.totalAltitude,
            activity.averageHeartRate,
            activity.maxHeartRate,
            activity.minHeartRate,
            activityId
        ];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`Activity updated: ${activityId}`);
                }
            });
        });
    }

    static resetAutoIncrement() {
        const sql = "DELETE FROM sqlite_sequence WHERE name = 'Activity'";

        return new Promise((resolve, reject) => {
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`Autoincrement reset`);
                }
            });
        });
    }

    static insertFile(activityId, activity) {
        this.resetAutoIncrement();
        const sql = ('INSERT INTO Data(activityId, date, description, time, heartRate, latitude, longitude, altitude ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const values = [
            activityId,
            activity.date,
            activity.description,
            activity.time,
            activity.cardio_frequency,
            activity.latitude,
            activity.longitude,
            activity.altitude,
        ];

        return new Promise((resolve, reject) => {
            db.run(sql, values, function(err) {
                if (err) {
                    console.error('Erreur lors de l\'insertion de l\'activité :', err);
                    reject(err); // Rejeter la promesse en cas d'erreur
                } else {
                    console.log('Activité insérée avec succès.');
                    resolve(); // Résoudre la promesse en cas de succès
                }
            });
        });
    }

    static getLastActivityId () {
        const sql = "SELECT activityId FROM Activity ORDER BY activityId DESC LIMIT 1";

        return new Promise((resolve, reject) => {
            db.get(sql, [], (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    return row.activityId;
                }
            });
        });
    }
}
module.exports = ActivityDAO;