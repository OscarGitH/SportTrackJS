const db = require('./sport-track-db').db;
const user_dao = require('./sport-track-db').user_dao;

async function clearDatabase() {
  try {
    await user_dao.deleteAll();
    console.log('Tous les utilisateurs ont été supprimés avec succès');
  } catch (err) {
    console.error('Erreur lors de la suppression de tous les utilisateurs :', err);
    throw err;
  }
}

async function resetAutoIncrement() {
  try {
    await user_dao.resetAutoIncrement();
    console.log('Réinitialisation de l\'auto-incrément effectuée avec succès');
  } catch (err) {
    console.error('Erreur lors de la réinitialisation de l\'auto-incrément :', err);
    throw err;
  }
}

async function insertUser(newUser) {
  try {
    await user_dao.insert(newUser);
    console.log('Nouvel utilisateur ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'ajout du nouvel utilisateur :', err);
    throw err;
  }
}

async function updateUser(user) {
    try {
        await user_dao.update(user);
        console.log('Utilisateur mis à jour avec succès');
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
        throw err;
    }
}

async function showUser(userId) {
    try {
        const user = await user_dao.findByKey(userId);
        console.log('Utilisateur ' + userId + ' :', user);
    } catch (err) {
        console.error('Erreur lors de l\'affichage de l\'utilisateur :', err);
        throw err;
    }
}

async function showUserByEmail(email) {
    try {
        const user = await user_dao.findByEmail(email);
        console.log('Utilisateur ' + email + ' :', user);
    } catch (err) {
        console.error('Erreur lors de l\'affichage de l\'utilisateur :', err);
        throw err;
    }
}

async function showAllUsers() {
    try {
        const users = await user_dao.findAll();
        console.log('Utilisateurs :', users);
    } catch (err) {
        console.error('Erreur lors de l\'affichage des utilisateurs :', err);
        throw err;
    }
}

async function deleteUser(userId) {
    try {
        await user_dao.delete(userId);
        console.log('Utilisateur supprimé avec succès');
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', err);
        throw err;
    }
}

async function deleteAllUsers() {
    try {
        await user_dao.deleteAll();
        console.log('Tous les utilisateurs ont été supprimés avec succès');
    } catch (err) {
        console.error('Erreur lors de la suppression de tous les utilisateurs :', err);
        throw err;
    }
}

const user1 = {
    lastName: 'Pierre',
    firstName: 'Noé',
    birthDate: '2004-11-04',
    gender: 'M',
    height: 180,
    weight: 75,
    email: 'noepierre@gmail.com',
    password: 'password123'
};

const user1Updated = {
    userId: 1, //Id de l'utilisateur à modifier
    lastName: 'Pierre',
    firstName: 'Noé',
    birthDate: '2004-11-04',
    gender: 'M',
    height: 180,
    weight: 84, //Poids modifié
    email: 'noepierremodif@gmail.com', //Email modifié
    password: 'password123'
}

const user2 = {
  lastName: 'Pavoine',
  firstName: 'Oscar',
  birthDate: '2004-01-04',
  gender: 'M',
  height: 181,
  weight: 80,
  email: 'oscar@gmail.com',
  password: 'password123'
}


async function main() {
  try {
    // Connexion à la base de données SQLite
    await clearDatabase();
    await resetAutoIncrement();

    console.log('\n----------------------------------------\n');

    // Insertion d'un utilisateur valide
    await insertUser(user1);
    console.log('\n');

    // Affichage de l'utilisateur 1
    console.log('Affichage de l\'utilisateur 1 :');
    await showUser(1);
    console.log('\n');
    
    // mise à jour de l'utilisateur 1
    await updateUser(user1Updated);
    console.log('\n');

    // insertion de l'utilisateur 2
    await insertUser(user2);

    // Affichage de tous les utilisateurs
    console.log('Affichage de tous les utilisateurs :');
    await showAllUsers();

    // Suppression de l'utilisateur 1
    await deleteUser(1);

    // Affichage de tous les utilisateurs
    console.log('Affichage de tous les utilisateurs :');
    await showAllUsers();

    // Suppression de tous les utilisateurs
    await deleteAllUsers();

    // Insertion des utilisateurs 1 et 2
    await insertUser(user1);
    await insertUser(user2);

    // Affichage de l'utilisateur avec l'email 'noepierre@gmail'
    console.log('Affichage de l\'utilisateur avec l\'email \'noepierre@gmail.com\' :');
    await showUserByEmail('noepierre@gmail.com');

    console.log('\n----------------------------------------\n');

    // Fermeture de la connexion à la base de données
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la base de données :', err.message);
      } else {
        console.log('Connexion à la base de données SQLite fermée.');
      }
    });
  } catch (err) {
    console.error('Une erreur est survenue :', err);
  }
}

main();
