var express = require('express');
var router = express.Router();

/* GET home page - also default pathway */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hellllo', val2: 'rory' });
});

/* GET NBA page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'NBA',val2: 'NBA' });
});

/* GET NBA page. */
router.get('/nba', function(req, res, next) {
  res.render('index', { title: 'NBA',val2: 'NBA' });
});

/* GET NBA page. */
router.get('/epl', function(req, res, next) {
  res.render('index', { title: 'EPL', val2: 'EPL' });
});

//This is what the return value of the entire file will be.
module.exports = router;

//testing