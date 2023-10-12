var express = require('express');
const session = require('express-session');
var router = express.Router();
var socker;
// Configuration du middleware express-session
router.use(session({secret: 'votre-secret-secret'}));

/* GET home page. */
router.get('/', function(req, res, next) {
  socker = req.session;
  // Obtenez la valeur de userId à partir de la session
  console.log('userId: ' + socker.userId);
  res.render('index', {userId: socker.userId });
});

module.exports = router;