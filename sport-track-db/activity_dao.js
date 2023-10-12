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

    static insert(activity, callback) {
        this.resetAutoIncrement();
        const sql = db.prepare("INSERT INTO Activity(activityId, userId, date, description, time, distance, averageSpeed, maxSpeed, totalAltitude, averageHeartRate, maxHeartRate, minHeartRate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        sql.run(
            activity.activityId,
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
            activity.minHeartRate,
            function (err) {
                if (err) {
                    console.error("Error inserting activity:", err.message);
                } else {
                    activity.activityId = this.lastID;
                }
                if (typeof callback === 'function') {
                    callback(err, activity.activityId);
                }
            }
        );
        sql.finalize();
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
                    resolve("Autoincrement reset.");
                }
            });
        });
    }
}

module.exports = ActivityDAO;
