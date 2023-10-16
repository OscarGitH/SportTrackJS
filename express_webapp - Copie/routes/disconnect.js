var express = require('express');
var router = express.Router();
var session = require('express-session');
var user_dao = require('../../sport-track-db/sport-track-db').user_dao;
var socker;
router.get('/',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});
module.exports = router;