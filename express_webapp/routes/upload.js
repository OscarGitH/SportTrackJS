var express = require('express');
var session = require('express-session');
var router = express.Router();
const fileUpload = require('express-fileupload');
var activity_dao = require('../../sport-track-db/sport-track-db').activity_dao;

// Configuration du middleware express-session
router.use(session({ secret: 'votre-secret-secret', resave: false, saveUninitialized: true }));
router.use(fileUpload());

router.get('/', async function (req, res, next) {
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
    const infoActivityDate = infoActivity.date + ' ' + infoData[0].time;
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

    await activity_dao.insert(dataActivity);
    const lastActivityId = await activity_dao.getLastActivityId();


    for (const data of infoData) {
      data.date = infoActivityDate;
      data.description = infoActivityDescription;
      await activity_dao.insertFile(lastActivityId, data);
    }

    await calculateAndUpdateActivityValues(lastActivityId);

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
    let distance = 0.0;
    let averageSpeed = 0.0;
    let maxSpeed = 0.0;
    let totalAltitude = 0.0;
    let averageHeartRate = 0;
    let maxHeartRate = 0;
    let minHeartRate = 0;

    let startTime = '00:00:00';
    let endTime = '00:00:00';
    let previousAltitude = null;
    let i = 0;

    const points = [];

    for (const data of datas) {
      if (i === 0) {
        startTime = data.time;
      }
      endTime = data.time;
      if (data.speed > maxSpeed) {
        maxSpeed = data.speed;
      }
      if (maxHeartRate === 0 && minHeartRate === 0) {
        minHeartRate = data.heartRate;
        maxHeartRate = data.heartRate;
      } else if (data.heartRate > maxHeartRate) {
        maxHeartRate = data.heartRate;
      } else if (data.heartRate < minHeartRate) {
        minHeartRate = data.heartRate;
      }
      averageHeartRate += data.heartRate;
      if (previousAltitude !== null) {
        totalAltitude += Math.abs(data.altitude - previousAltitude);
      }
      previousAltitude = data.altitude;

      points.push({ latitude: data.latitude, longitude: data.longitude });
      i += 1;
    }

    averageHeartRate = averageHeartRate / i;
    distance = calculDistanceTrajet({ points });
    const startTimeDate = convertToTimeObject(startTime);
    const endTimeDate = convertToTimeObject(endTime);
    const differenceInMillis = endTimeDate - startTimeDate;
    averageSpeed = distance / (differenceInMillis / (1000 * 60 * 60));

    time = formatTimePart(Math.floor(differenceInMillis / (1000 * 60 * 60))) + ':' + formatTimePart(Math.floor((differenceInMillis / (1000 * 60)) % 60)) + ':' + formatTimePart(Math.floor((differenceInMillis / 1000) % 60));
    averageSpeed = averageSpeed.toFixed(2);
    distance = distance.toFixed(3);
    averageHeartRate = averageHeartRate.toFixed(2);

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

    await activity_dao.update(activityId, ret);
  } catch (error) {
    console.error(error);
  }
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function calculDistance2PointsGPS(lat1, lon1, lat2, lon2) {
  const R = 6378.137;

  const lat1Rad = degToRad(lat1);
  const lon1Rad = degToRad(lon1);
  const lat2Rad = degToRad(lat2);
  const lon2Rad = degToRad(lon2);

  const d = R * Math.acos(Math.sin(lat2Rad) * Math.sin(lat1Rad) + Math.cos(lat2Rad) * Math.cos(lat1Rad) * Math.cos(lon2Rad - lon1Rad));

  return d;
}

function calculDistanceTrajet(activite) {
  const points = activite.points;
  let distanceTotale = 0;

  for (let i = 1; i < points.length; i++) {
    const point1 = points[i - 1];
    const point2 = points[i];
    const distance = calculDistance2PointsGPS(point1.latitude, point1.longitude, point2.latitude, point2.longitude);
    distanceTotale += distance;
  }

  return distanceTotale;
}

function convertToTimeObject(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(parseInt(seconds, 10));
  return date;
}

function formatTimePart(part) {
  return part.toString().padStart(2, '0');
}

module.exports = router;
