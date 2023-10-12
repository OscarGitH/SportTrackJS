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
