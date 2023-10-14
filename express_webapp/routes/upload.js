var express = require('express');
var session = require('express-session');
var router = express.Router();
const fileUpload = require('express-fileupload');
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

router.post('/', async (req, res) => {
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
    const lastActivityId = await activity_dao.getLastActivityId();
    for (const data of infoData) {
      data.date = infoActivityDate;
      data.description = infoActivityDescription;
      activity_dao.insertFile(lastActivityId, data);
    }

    calculateAndUpdateActivityValues(lastActivityId);

    console.log('Upload terminé');
    res.redirect('/activities');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de l`upload');
  }
});


async function calculateAndUpdateActivityValues(activityId) {
  try {
    const datas = await activity_dao.getDataByActivityId(activityId);

    let time = '00:00:00';
    let distance = 0.0
    let averageSpeed = 0.0;
    let maxSpeed = 0.0;
    let totalAltitude = 0.0;
    let averageHeartRate = 0;
    let maxHeartRate = 0;
    let minHeartRate = 0;

    let startTime = '00:00:00';
    let endTime = '00:00:00';
    let i = 0;

    for (const data of datas) {
      if (startTime === '00:00:00') {
          startTime = data.time;
          endTime = data.time;
      }
      if (data.time > endTime) {
          endTime = data.time;
      } else if (data.time < startTime) {
          startTime = data.time;
      }
      if (data.speed > maxSpeed) {
          maxSpeed = data.speed;
      }
      if (data.heartRate > maxHeartRate) {
          maxHeartRate = data.heartRate;
      } else if (data.heartRate < minHeartRate) {
          minHeartRate = data.heartRate;
      }
      averageHeartRate += data.heartRate;

      i += 1;
    }

    const startTimeMilliseconds = timeStringToMilliseconds(startTime);
    const endTimeMilliseconds = timeStringToMilliseconds(endTime);
    const timeInMilliseconds = endTimeMilliseconds - startTimeMilliseconds;
    // Calculer les heures, minutes et secondes
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);

    time = hours + ':' + minutes + ':' + seconds;
    console.log('time: ' + time);

    // averageSpeed = (distance / 1000) / (time / 3600);
    averageHeartRate = averageHeartRate / i;

    const ret = {
      time: time,
      distance: distance,
      averageSpeed: averageSpeed,
      maxSpeed: maxSpeed,
      totalAltitude: totalAltitude,
      averageHeartRate: averageHeartRate,
      maxHeartRate: maxHeartRate,
      minHeartRate: minHeartRate,
    };

    activity_dao.update(activityId, ret);
  } catch (error) {
    console.error(error);
  }
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}
function calculDistance2PointsGPS(lat1, lon1, lat2, lon2) {
  const R = 6378.137; // Rayon de la Terre en kilomètres

  // Conversion des latitudes et longitudes en radians
  const lat1Rad = degToRad(lat1);
  const lon1Rad = degToRad(lon1);
  const lat2Rad = degToRad(lat2);
  const lon2Rad = degToRad(lon2);

  // Calcul de la distance en utilisant la formule haversine
  const d = R * Math.acos(Math.sin(lat2Rad) * Math.sin(lat1Rad) + Math.cos(lat2Rad) * Math.cos(lat1Rad) * Math.cos(lon2Rad - lon1Rad));

  return d;
}
function calculDistanceTrajet(activite) {
  const points = activite.points; // Supposons que "points" est un tableau d'objets {latitude, longitude}
  let distanceTotale = 0;

  // Calcul de la distance entre chaque paire de points consécutifs
  for (let i = 1; i < points.length; i++) {
    const point1 = points[i - 1];
    const point2 = points[i];
    const distance = calculDistance2PointsGPS(point1.latitude, point1.longitude, point2.latitude, point2.longitude);
    distanceTotale += distance;
  }

  return distanceTotale;
}
function timeStringToMilliseconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return ((hours * 3600 + minutes * 60 + seconds) * 1000);
}

module.exports = router;