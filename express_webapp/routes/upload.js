var express = require('express');
var session = require('express-session');
var router = express.Router();
const fileUpload = require('express-fileupload');
const formidable = require('formidable');
const fs = require('fs');
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var activity_dao = require('../../sport-track-db/sport-track-db').activity_dao;

// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));
router.use(fileUpload());


router.get('/', async function(req, res, next) {
  try {
    res.render('upload');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l`upload');
  }
});

router.post('/', (req, res) => {
  const uploadedFile = req.files.file;

  if (!uploadedFile) {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }
  const fileData = uploadedFile.data;

  try {
    const jsonData = JSON.parse(fileData.toString('utf8'));

    const activityData = jsonData.activity;
    const activityDate = activityData.date;
    const activityDescription = activityData.description;

    const activityId = 1; // Supposons que vous avez déjà l'ID de l'activité

    for (const data of jsonData.data) {
      data.date = activityDate; // Ajoutez la date aux données
      data.description = activityDescription; // Ajoutez la description aux données
      activity_dao.insertFile(activityId, data);
    }

    res.send('Les données du fichier ont été insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
    res.status(500).send('Erreur lors de la lecture du fichier.');
  }
});
module.exports = router;