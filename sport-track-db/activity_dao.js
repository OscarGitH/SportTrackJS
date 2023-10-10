const sqlite3 = require('sqlite3').verbose();
const db = require('./sqlite_connection');

class ActivityDAO {
    static find(id, callback) {
        const sql = db.prepare("SELECT * FROM Activity WHERE activityId = ?");
        sql.get(id, function (err, row) {
            if (err) {
                console.error("Error finding activity:", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                if (row) {
                    const activity = {
                        activityId: row.activityId,
                        userId: row.userId,
                        date: row.date,
                        description: row.description,
                        time: row.time,
                        distance: row.distance,
                        averageSpeed: row.averageSpeed,
                        maxSpeed: row.maxSpeed,
                        totalAltitude: row.totalAltitude,
                        averageHeartRate: row.averageHeartRate,
                        maxHeartRate: row.maxHeartRate,
                        minHeartRate: row.minHeartRate
                    };
                    if (typeof callback === 'function') {
                        callback(null, activity);
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback(null, null);
                    }
                }
            }
        });
        sql.finalize();
    }

    static findAll(callback) {
        const sql = "SELECT * FROM Activity";
        db.all(sql, [], function (err, rows) {
            if (err) {
                console.error("Error finding all activities:", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                const activities = rows.map(row => ({
                    activityId: row.activityId,
                    userId: row.userId,
                    date: row.date,
                    description: row.description,
                    time: row.time,
                    distance: row.distance,
                    averageSpeed: row.averageSpeed,
                    maxSpeed: row.maxSpeed,
                    totalAltitude: row.totalAltitude,
                    averageHeartRate: row.averageHeartRate,
                    maxHeartRate: row.maxHeartRate,
                    minHeartRate: row.minHeartRate
                }));
                if (typeof callback === 'function') {
                    callback(null, activities);
                }
            }
        });
    }

    static findByIdUser(id, callback) {
        const sql = db.prepare("SELECT * FROM Activity WHERE userId = ?");
        sql.all(id, function (err, rows) {
            if (err) {
                console.error("Error finding activities by user ID:", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                const activities = rows.map(row => ({
                    activityId: row.activityId,
                    userId: row.userId,
                    date: row.date,
                    description: row.description,
                    time: row.time,
                    distance: row.distance,
                    averageSpeed: row.averageSpeed,
                    maxSpeed: row.maxSpeed,
                    totalAltitude: row.totalAltitude,
                    averageHeartRate: row.averageHeartRate,
                    maxHeartRate: row.maxHeartRate,
                    minHeartRate: row.minHeartRate
                }));
                if (typeof callback === 'function') {
                    callback(null, activities);
                }
            }
        });
        sql.finalize();
    }

    static findByEmail(email, callback) {
        const sql = db.prepare("SELECT * FROM Activity WHERE userId = (SELECT userId FROM User WHERE email = ?)");
        sql.all(email, function (err, rows) {
            if (err) {
                console.error("Error finding activities by user email:", err.message);
                if (typeof callback === 'function') {
                    callback(err, null);
                }
            } else {
                const activities = rows.map(row => ({
                    activityId: row.activityId,
                    userId: row.userId,
                    date: row.date,
                    description: row.description,
                    time: row.time,
                    distance: row.distance,
                    averageSpeed: row.averageSpeed,
                    maxSpeed: row.maxSpeed,
                    totalAltitude: row.totalAltitude,
                    averageHeartRate: row.averageHeartRate,
                    maxHeartRate: row.maxHeartRate,
                    minHeartRate: row.minHeartRate
                }));
                if (typeof callback === 'function') {
                    callback(null, activities);
                }
            }
        });
        sql.finalize();
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

    static delete(activity, callback) {
        const sql = db.prepare("DELETE FROM Activity WHERE activityId = ?");
        sql.run(activity.activityId, function (err) {
            if (err) {
                console.error("Error deleting activity:", err.message);
                if (typeof callback === 'function') {
                    callback(err);
                }
            } else {
                console.log(`Activity deleted`);
            }
        });
        sql.finalize();
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
