var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Obtenez la valeur de userId à partir de la session
  const userId = req.session.userId;
  res.render('index', { title: 'SportTrack', userId: userId });
});


module.exports = router;