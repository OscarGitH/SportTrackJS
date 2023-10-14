var express = require('express');
var session = require('express-session');
var router = express.Router();
const fileUpload = require('express-fileupload');
const formidable = require('formidable');
const fs = require('fs');
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var activity_dao = require('../../sport-track-db/sport-track-db').activity_dao;

// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret',resave: false, saveUninitialized: true, }));
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
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded.');
    }
    const uploadedFile = req.files.file;
    const jsonData = JSON.parse(uploadedFile.data.toString());

    const infoData = jsonData.data;
    const infoActivity = jsonData.activity;
    const infoActivityDate = infoActivity.date;
    const infoActivityDescription = infoActivity.description;

    const dataActivity = {
      userId: req.session.userId.userId,
      date: infoActivityDate,
      description: infoActivityDescription,
      time: '00:00:00',
      distance: 0.0,
      averageSpeed: 0.0,
      maxSpeed: 0.0,
      totalAltitude: 0.0,
      averageHeartRate: 0,
      maxHeartRate: 0,
      minHeartRate: 0,
    };

    activity_dao.insert(dataActivity);
    const lastActivityId = activity_dao.getLastActivityId();
    console.log(lastActivityId);

    for (const data of infoData) {
      data.date =  infoActivityDate;
      data.description = infoActivityDescription;
      activity_dao.insertFile(lastActivityId, data);
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l`upload');
  }
});

module.exports = router;