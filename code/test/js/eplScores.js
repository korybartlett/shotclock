var csvArr; 
var scoreArr;
var premTeam = ["Chelsea", "Tottenham", "Liverpool", "Man City", "Man United", "Manchester United", "Arsenal", "Everton", "West Brom", "Southampton", "Bournemouth", "Leicester", "Stoke", "Watford", "Burnley", "West Ham", "Crystal Palace", "Hull", "Swansea", "Middlesbrough", "Sunderland"]
var arrToCSV = [];

$(document).ready( function() {
	initLoad();
});

function fixDate(){
	for(var i=1; i < scoreArr.length; i++){
		var csvDate = scoreArr[i][4];
		var dateSplit = csvDate.split("/");
		var month = dateSplit[0];

		if(month < 10){
			month = month.substring(1, month.length);
			dateSplit[0] = month;
			scoreArr[i][4] = dateSplit.join("/");
		}
	}
}

function addScore(){
	var index = scoreArr.length - 1;
	for(var i = 1; i < csvArr.length; i++){
		for(var j = index; j > 0 ; j--){
			var match = 0;
			//name check for first column
			if(csvArr[i][0] == scoreArr[j][0] && csvArr[i][2] == scoreArr[j][2]){
				var csvArrDateSplit = csvArr[i][5].split("/");
				var scoreArrDateSplit = scoreArr[j][4].split("/");
				// console.log(csvArrDateSplit);
				// console.log(scoreArrDateSplit);
				if(csvArrDateSplit[0] == scoreArrDateSplit[0] && csvArrDateSplit[2] == scoreArrDateSplit[2]){
					console.log("match made at " + i + " and j of " + j);
					csvArr[i][1] = scoreArr[j][1];
					csvArr[i][3] = scoreArr[j][3];
					csvArr[i][5] = scoreArr[j][4];
					match = 1;
					// index = j;
				}
			}

			if(csvArr[i][0] == scoreArr[j][2] && csvArr[i][2] == scoreArr[j][0]){
				var csvArrDateSplit = csvArr[i][5].split("/");
				var scoreArrDateSplit = scoreArr[j][4].split("/");
				// console.log(csvArrDateSplit);
				// console.log(scoreArrDateSplit);
				if(csvArrDateSplit[0] == scoreArrDateSplit[0] && csvArrDateSplit[2] == scoreArrDateSplit[2]){
					console.log("match made at " + i + " and j of " + j);
					csvArr[i][1] = scoreArr[j][3];
					csvArr[i][3] = scoreArr[j][1];
					csvArr[i][5] = scoreArr[j][4];
					match = 1;
					// index = j;
				}
			}

			if(match == 1){
				break;
			}
		}
	}
	createCSV();
}

function changeCSVArr(){
	var team1 = team2 = "";
	
	for (var i = 0; i < csvArr.length; i++) {
		var match = 1;
		if(team1 != csvArr[i][0] || team2 != csvArr[i][1]){
			team1 = csvArr[i][0];
			team2 = csvArr[i][1];	
			match = 0;
		}

		if(match){
			csvArr.splice(i, 1);
		}	
	}
}

function clearWS(){
	for(var i =0; i < csvArr.length;i++){
		csvArr[i][0] = csvArr[i][0].replace(/\s+/g, '');
		csvArr[i][1] = csvArr[i][1].replace(/\s\s+/g, '');
		csvArr[i][1] = " "+csvArr[i][1];
		if(/^\s+/.test(csvArr[i][2])){
			var lessSpace = csvArr[i][2].replace(/^\s+/g, '');
			csvArr[i][2] = lessSpace;
		}
	}
}

// function getScore17(){
// 	var match = 0;
// 	for(var i = 156; i > 0; i--){
// 		var tempMatch = match;
// 		var team1 = csvArr[i][0];
// 		var team2 = csvArr[i][2];
// 		for (var j = 2; j < scoreArr.length; j++) {
// 			var teamLeft = scoreArr[j][0];
// 			var teamRight = scoreArr[j][2];

// 			if(teamLeft == "" || teamRight == "" || team1 == "" || team1 == ""){
// 				continue;
// 			}

// 			if(teamLeft.includes(team1)){
// 				if (teamRight.includes(team2)){
// 					match++;
// 					// console.log("team1: " + team1);
// 					// console.log("team2: " + team2);
// 					// console.log("teamLeft: " + teamLeft);
// 					// console.log("teamRight: " + teamRight);
// 					// console.log("j:" + j);
// 					// console.log("i:" + i);
// 					var score = scoreArr[j][1];
// 					score = score.replace(/\s+/g, '');
// 					var scoreTemp = score.split("-");
// 					csvArr[i][1] = scoreTemp[0];
// 					csvArr[i][3] = scoreTemp[1];
// 					break;
// 				}
// 			}
// 			else if(teamRight.includes(team1)){
// 				if (teamLeft.includes(team2)){
// 					match++;
// 					// console.log("team1: " + team1);
// 					// console.log("team2: " + team2);
// 					// console.log("teamLeft: " + teamLeft);
// 					// console.log("teamRight: " + teamRight);
// 					// console.log("j:" + j);
// 					// console.log("i:" + i);
// 					var score = scoreArr[j][1];
// 					score = score.replace(/\s+/g, '');
// 					var scoreTemp = score.split("-");
// 					csvArr[i][1] = scoreTemp[1];
// 					csvArr[i][3] = scoreTemp[0];
// 					break;
// 				}
// 			}
// 		}
// 		if(tempMatch == match){
// 			console.log("Unable to match");
// 			console.log("team1: " + team1);
// 			console.log("team2: " + team2);
// 			console.log("");
// 		}
		
// 	}
// 	console.log("Number of matches: " + match);
// }

// function getScore16(){
// 	var match = 0;
// 	for(var i = csvArr.length - 1; i > 156; i--){
// 		var tempMatch = match;
// 		var team1 = csvArr[i][0];
// 		var team2 = csvArr[i][2];
// 		for (var j = 2; j < scoreArr.length; j++) {
// 			var teamLeft = scoreArr[j][0];
// 			var teamRight = scoreArr[j][2];

// 			if(teamLeft == "" || teamRight == "" || team1 == "" || team1 == ""){
// 				continue;
// 			}

// 			if(teamLeft.includes(team1)){
// 				if (teamRight.includes(team2)){
// 					match++;
// 					// console.log("team1: " + team1);
// 					// console.log("team2: " + team2);
// 					// console.log("teamLeft: " + teamLeft);
// 					// console.log("teamRight: " + teamRight);
// 					// console.log("j:" + j);
// 					// console.log("i:" + i);
// 					var score = scoreArr[j][1];
// 					score = score.replace(/\s+/g, '');
// 					var scoreTemp = score.split("-");
// 					csvArr[i][1] = scoreTemp[0];
// 					csvArr[i][3] = scoreTemp[1];
// 					break;
// 				}
// 			}
// 			else if(teamRight.includes(team1)){
// 				if (teamLeft.includes(team2)){
// 					match++;
// 					// console.log("team1: " + team1);
// 					// console.log("team2: " + team2);
// 					// console.log("teamLeft: " + teamLeft);
// 					// console.log("teamRight: " + teamRight);
// 					// console.log("j:" + j);
// 					// console.log("i:" + i);
// 					var score = scoreArr[j][1];
// 					score = score.replace(/\s+/g, '');
// 					var scoreTemp = score.split("-");
// 					csvArr[i][1] = scoreTemp[1];
// 					csvArr[i][3] = scoreTemp[0];
// 					break;
// 				}
// 			}
// 		}
// 		if(tempMatch == match){
// 			console.log("Unable to match");
// 			console.log("team1: " + team1);
// 			console.log("team2: " + team2);
// 			console.log("");
// 		}
		
// 	}
// 	console.log("Number of matches: " + match);
// }

function createCSV(){
	console.log(csvArr);
	var data = $.csv.fromArrays(csvArr);
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent= csvContent + data;
	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}

function load2CSV(){
	if( document.getElementById("filebtn").files.length == 0 ){
		alert("no files selected, unable to load progress report");
		return;
	}

	//establishes file reader object
	var fr = new FileReader();
	//grabs file properties with uploaded files
	var files = $("#filebtn2").prop('files');

	//grabs the first file object from file reader
	fr.readAsText(files[0]);

	//loads the file information from file object and splits at comma
	fr.onload = function() {
		var importData = this.result;
		//importData = importData.split(",");
		//console.log(importData);
		csvArr = $.csv.toArrays(importData);
		console.log(csvArr);
		//getArrVal();
		//changeCSVArr();
		//createCSV();
		//clearWS();
		addScore();
		// console.log(csvArr);
		// var data = $.csv.fromArrays(csvArr);
		// var csvContent = "data:text/csv;charset=utf-8,";
		// csvContent= csvContent + data;
		// var encodedUri = encodeURI(csvContent);
		// window.open(encodedUri);
	}
}

function loadCSV(){
	//establishes file reader object
	var fr = new FileReader();
	//grabs file properties with uploaded files
	var files = $("#filebtn").prop('files');

	//grabs the first file object from file reader
	fr.readAsText(files[0]);

	//loads the file information from file object and splits at comma
	fr.onload = function() {
		var importData = this.result;
		scoreArr = $.csv.toArrays(importData);
		//csvData();
		//fixDate()
		load2CSV();
		//console.log(scoreArr);
	}

	console.log("Loaded scores");
}

function initLoad(){
  //onclick functionality that grabs information from imported files
  $("#loadbtn").click(function() {
    loadCSV();
  });
  $("#loadbtn2").click(function() {
    load2CSV();
  });
}