var express = require('express');
var router = express.Router();
var request = require('request');

// request('http://localhost:9200/deployshotclock/nba/_search?pretty=true&size=500', function (error, response, body) {
//   		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   		var matchedGames = response.body;
//   		console.log('body:' , matchedGames);
//   		parsedGames = JSON.parse(matchedGames);
//   		betterParsedGames = parsedGames.hits.hits;
//   		console.log('parsedGames: ', betterParsedGames.length);
//   		//prints the information in the way we'd like. 
//   		for (i=0; i<betterParsedGames.length; i++) {
//   			console.log(betterParsedGames[i]._source);
//   		}
// });

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

/* CUSTOMIZE SETTINGS PAGE */
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login', val2: 'Customize' });
});

/* Logged In Session Page: NBA */
router.get('/loggedinNBA', function(req, res, next) {
	res.render('loggedinNBA', { title: 'Logged in Now', val2: 'here we go'})
});

/* Logged In Session Page: EPL */
router.get('/loggedinEPL', function(req, res, next) {
	res.render('loggedinEPL', { title: 'Logged in Now', val2: 'here we go'})
});

//This is what the return value of the entire file will be.
module.exports = router;

//testing
