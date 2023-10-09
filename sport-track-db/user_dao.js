const sqlite3 = require('sqlite3').verbose();
const db = require('./sqlite_connection');
class user_dao {
    // Méthode pour insérer un nouvel utilisateur
    static insert(user, callback) {
        const sql = db.prepare("INSERT INTO User (userId, lastName, firstName, birthDate, gender, height, weight, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        sql.run(
            user.userId,
            user.lastName,
            user.firstName,
            user.birthDate,
            user.gender,
            user.height,
            user.weight,
            user.email,
            user.password,
            function (err) {
                if (err) {
                    console.error("Erreur lors de l'insertion :", err.message);
                } else {
                    console.log('Insertion réussie.');
                }
                if (typeof callback === 'function') {
                    callback(err, user.userId);
                }
            }
        );
        sql.finalize();
    };

/*
    // Méthode pour mettre à jour un utilisateur
    static update(userId, user) {
        const sql = 'UPDATE User SET lastName = ?, firstName = ?, birthDate = ?, gender = ?, height = ?, weight = ?, email = ?, password = ? WHERE userId = ?';
        const params = [
            user.lastName,
            user.firstName,
            user.birthDate,
            user.gender,
            user.height,
            user.weight,
            user.email,
            user.password,
            userId
        ];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`User updated: ${userId}`);
                }
            });
        });
    }

    // Méthode pour supprimer un utilisateur par son ID
    static delete(userId) {
        const sql = `DELETE FROM User WHERE userId = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`User deleted: ${userId}`);
                }
            });
        });
    }

    // Méthode pour vider la table User
    static deleteAll() {
        const sql = `DELETE FROM User`;

        return new Promise((resolve, reject) => {
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(`All users deleted`);
                }
            });
        });
    }

    // Méthode pour reset l'autoincrement de la table User
    static resetAutoIncrement() {
        const sql = `DELETE FROM sqlite_sequence WHERE name = 'User'`;

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

    // Méthode pour trouver un utilisateur par son ID
    static findByKey(userId) {
        const sql = `SELECT * FROM User WHERE userId = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, userId, (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Méthode pour trouver un utilisateur par son email
    static findByEmail(email) {
        const sql = `SELECT * FROM User WHERE email = ?`;

        return new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Méthode pour trouver tous les utilisateurs
    static findAll() {
        const sql = `SELECT * FROM User`;

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }*/
}

var dao = new user_dao();
module.exports = user_dao;
