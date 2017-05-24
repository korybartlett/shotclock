$(document).ready( function() {
	initLoad();
});

function callApi(theGameData) {
	$.ajax(
		{
		  type: "POST",
		  url: "https://9a9328cd78bd9d11bd223db7e47c5ec5.us-east-1.aws.found.io:9243/epl",
		  contentType: 'application/json',
		  corssDomain: true,
		  data: theGameData,
		  async: false,
		 headers: {"Authorization", btoa("elastic" + ":" + "33cUXbdBFZgMOklhII08gpJa")},
	 	  success: function(response){
			console.log("posted!");
		  },
		  error: function(){
			 	console.log("failed");
			 	console.log("shit being posted", theGameData);		  }
		}	
	);
}

function initLoad(){
	console.log('This many items in array: ', soccer.length);
	for (var i=0; i<soccer.length; i++) {
		callApi(JSON.stringify(soccer[i]));
	}
	// var apple = {
	// 	"homeTeam": "Golden State Warriors",
 //    	"homeTeamAbv": "GSW",
 //    	"awayTeam": "Utah Jazz",
 //   		 "awayTeamAbv": "UTH",
 //   		 "homeTeamScore":"121",
 //   		 "awayTeamScore": "95",
 //   		 "homeTeamCity": "Golden State",
 //    	"awayTeamCity": "Utah",
 //    	"datePlayed": "01/01/2015"
	// };
	// callApi(JSON.stringify(apple));
}
