var faveBaskArr = [];

$(document).ready( function() {
	parseJSON();
});

var basketball = { 
	"basketball" : {
      "Sacramento_Kings" : 0,
      "Milwaukee_Bucks" : 0
	}
};

function parseJSON() {
	var teamJSON = basketball["basketball"];
	for (var key in teamJSON) {
	  if (teamJSON.hasOwnProperty(key)) {
	    faveBaskArr[key] = teamJSON[key];
	  }
	}

	console.log(basketball["basketball"]);
	for(var i = 0; i < 5; i++){
		if(faveBaskArr.hasOwnProperty("Sacramento_Kings")){
			faveBaskArr["Sacramento_Kings"] += 1;
		}
	}

	var createdJSON = JSON.stringify(faveBaskArr);
	console.log(faveBaskArr);
	console.log(createdJSON);
}