const db = require('./sport-track-db').db;
const user_dao = require('./sport-track-db').user_dao;
const activity_dao = require('./sport-track-db').activity_dao;

// tests de la classe user_dao

async function clearDatabase() {
  try {
    await user_dao.deleteAll();
    await activity_dao.deleteAll();
    console.log('Tous les utilisateurs et activités ont été supprimés avec succès');
  } catch (err) {
    console.error('Erreur lors de la suppression de tous les utilisateurs et activités :', err);
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

// tests de la classe activity_dao

async function insertActivity(newActivity) {
    try {
        await activity_dao.insert(newActivity);
        console.log('Nouvelle activité ajoutée avec succès');
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la nouvelle activité :', err);
        throw err;
    }
}

async function updateActivity(activityId, updatedActivity) {
  try {
      updatedActivity.activityId = activityId;
      await activity_dao.update(activityId, updatedActivity);
      console.log('Activité mise à jour avec succès');
  } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'activité :', err);
      throw err;
  }
}

async function deleteActivity(activityId) {
    try {
        await activity_dao.delete(activityId);
        console.log('Activité supprimée avec succès');
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'activité :', err);
        throw err;
    }
}

async function deleteAllActivities() {
    try {
        await activity_dao.deleteAll();
        console.log('Toutes les activités ont été supprimées avec succès');
    } catch (err) {
        console.error('Erreur lors de la suppression de toutes les activités :', err);
        throw err;
    }
}

async function showActivity(activityId) {
    try {
        const activity = await activity_dao.find(activityId);
        console.log('Activité ' + activityId + ' :', activity);
    } catch (err) { 
        console.error('Erreur lors de l\'affichage de l\'activité :', err);
        throw err;
    }
}

async function showAllActivities() {
    try {
        const activities = await activity_dao.findAll();
        console.log('Activités :', activities);
    } catch (err) {
        console.error('Erreur lors de l\'affichage des activités :', err);
        throw err;
    }
}

async function showActivitiesByUser(userId) {
    try {
        const activities = await activity_dao.findByIdUser(userId);
        console.log('Activités de l\'utilisateur ' + userId + ' :', activities);
    } catch (err) {
        console.error('Erreur lors de l\'affichage des activités de l\'utilisateur :', err);
        throw err;
    }
}

async function findActivitiesByUserMail(email) {
    try {
        const activities = await activity_dao.findByEmail(email);
        console.log('Activités de l\'utilisateur ' + email + ' :', activities);
    } catch (err) {
        console.error('Erreur lors de l\'affichage des activités de l\'utilisateur :', err);
        throw err;
    }
}

const activity1 = {
    userId: 1,
    date: '01/01/2021',
    description: 'Course à pied',
    time: '01:00:00',
    distance: 10000,
    averageSpeed: 10,
    maxSpeed: 12,
    totalAltitude: 50,
    averageHeartRate: 150,
    maxHeartRate: 160,
    minHeartRate: 140
};

const activity1Updated = {
    activityId: 1, //Id de l'activité à modifier
    userId: 1,
    date: '01/01/2021',
    description: 'Course à pied',
    time: '01:00:00',
    distance: 10030, //Distance modifiée
    averageSpeed: 11, //Vitesse moyenne modifiée
    maxSpeed: 12,
    totalAltitude: 50,
    averageHeartRate: 150,
    maxHeartRate: 160,
    minHeartRate: 140
};

const activity2 = {
    userId: 1,
    date: '02/01/2021',
    description: 'Course à pied',
    time: '01:00:00',
    distance: 10000,
    averageSpeed: 10,
    maxSpeed: 12,
    totalAltitude: 50,
    averageHeartRate: 150,
    maxHeartRate: 160,
    minHeartRate: 140
};

const activity3 = {
    userId: 2,
    date: '03/01/2021',
    description: 'Course à pied',
    time: '01:00:00',
    distance: 10000,
    averageSpeed: 10,
    maxSpeed: 12,
    totalAltitude: 50,
    averageHeartRate: 150,
    maxHeartRate: 160,
    minHeartRate: 140
};

async function main() {
  try {
    // Connexion à la base de données SQLite
    await clearDatabase();
    await resetAutoIncrement();

    console.log('\n----------------------------------------\n');

    console.log('\n------Test de la classe user_dao------\n');

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
    console.log('\n');

    // Affichage de tous les utilisateurs
    console.log('Affichage de tous les utilisateurs :');
    await showAllUsers();
    console.log('\n');

    // Suppression de l'utilisateur 1
    await deleteUser(1);
    console.log('\n');

    // Affichage de tous les utilisateurs
    console.log('Affichage de tous les utilisateurs :');
    await showAllUsers();
    console.log('\n');

    // Suppression de tous les utilisateurs
    await deleteAllUsers();
    console.log('\n');

    // Insertion des utilisateurs 1 et 2
    await insertUser(user1);
    console.log('\n');
    await insertUser(user2);
    console.log('\n');

    // Affichage de tous les utilisateurs une fois qu'ils ont été réinsérés
    console.log('Affichage de tous les utilisateurs :');
    await showAllUsers();
    console.log('\n');

    // Affichage de l'utilisateur avec l'email 'noepierre@gmail'
    console.log('Affichage de l\'utilisateur avec l\'email \'noepierre@gmail.com\' :');
    await showUserByEmail('noepierre@gmail.com');

    console.log('\n------Test de la classe activity_dao------\n');

    // Insertion d'une activité
    await insertActivity(activity1);
    console.log('\n');

    // Affichage de l'activité 1
    console.log('Affichage de l\'activité 1 :');
    await showActivity(1);
    console.log('\n');

    // mise à jour de l'activité 1
    await updateActivity(1, activity1Updated);
    console.log('\n');

    // insertion de l'activité 2
    await insertActivity(activity2);
    console.log('\n');

    // insertion de l'activité 3
    await insertActivity(activity3);
    console.log('\n');

    // Affichage des activités de l'utilisateur 1
    console.log('Affichage des activités de l\'utilisateur 1 :');
    await showActivitiesByUser(1);
    console.log('\n');

    // Affichage des activités de l'utilisateur avec l'email 'noepierre@gmail.com'
    console.log('Affichage des activités de l\'utilisateur avec l\'email \'noepierre@gmail.com\' :');
    await findActivitiesByUserMail('noepierre@gmail.com');
    console.log('\n');

    // Suppression de l'activité 1
    await deleteActivity(1);
    console.log('\n');

    // Affichage de toutes les activités
    console.log('Affichage de toutes les activités :');
    await showAllActivities();
    console.log('\n');

    // Suppression de toutes les activités
    await deleteAllActivities();

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
