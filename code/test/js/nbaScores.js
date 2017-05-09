var csvArr;
var matchesFound = 0;

$(document).ready( function() {
	initLoad();
});

function callApi(dateString, date, index) {
	console.log(dateString);
	$.ajax(
		{
		  type: "GET",
		  url: "https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/scoreboard.json?fordate="+dateString,
		  dataType: 'json',
		  async: false,
		  headers: {"Authorization": "Basic " + btoa("chelseawarriors" + ":" + "12pCmG")},
	 		success: function(response){
				saveApi(response, date, index);
			},
			error: function(){
				console.log("fail at " + date);
			}
		}	
	);
}

function saveApi(response, date, index){
	//console.log("Number of objects: " + response.scoreboard.gameScore.length + " and Date: " + date);
	var dateFound = 0;
	console.log(response.scoreboard.gameScore);
	for(var i = index; i < csvArr.length; i++){
		console.log("Date: " + date + " Array date: " + csvArr[i][4])
		if(date == csvArr[i][4]){
			dateFound = 1;
			// console.log("Array 0 team:" + csvArr[i][0]);
			// console.log("Array 2 team:" + csvArr[i][2]);
			for(var j = 0; j < response.scoreboard.gameScore.length; j++){
				var gameDetail = response.scoreboard.gameScore[j].game;
				var awayTeam = gameDetail.awayTeam.City + " " + gameDetail.awayTeam.Name;
				var homeTeam = gameDetail.homeTeam.City + " " + gameDetail.homeTeam.Name;
				// console.log("Home team:" + homeTeam);
				// console.log("Away team:" + awayTeam);
				if(awayTeam == csvArr[i][0] ){
					//console.log("one team matches " + awayTeam)
					if(response.scoreboard.gameScore[j].awayScore != csvArr[i][1]){
						csvArr[i][1] = response.scoreboard.gameScore[j].awayScore;	
					}
					if(homeTeam == csvArr[i][2]){
						if(response.scoreboard.gameScore[j].homeScore != csvArr[i][3]){
							csvArr[i][3] = response.scoreboard.gameScore[j].homeScore;	
						}
						//console.log("both teams match");
						matchesFound++;
						break;
					}
				}
				if(homeTeam == csvArr[i][0]){
					//console.log("one team matches " + homeTeam)
					if(response.scoreboard.gameScore[j].homeScore != csvArr[i][1]){
							csvArr[i][1] = response.scoreboard.gameScore[j].homeScore;	
					}
					if(awayTeam == csvArr[i][2] ){
						if(response.scoreboard.gameScore[j].awayScore != csvArr[i][3]){
							csvArr[i][3] = response.scoreboard.gameScore[j].awayScore;	
						}
						//console.log("both teams match");	
						matchesFound++;
						break;
					}
				}

			}
		}
		else if(dateFound == 1 && date != csvArr[i][4]){
			console.log("Break at " + "Date: " + date + " Array date: " + csvArr[i][4])
			break;
		}
	}
} 

function getArrVal() {
	var dateChange = 0;
	//console.log(csvArr);
	var date = "";
	var dateString = "";
	//csvArr.length
	for(var index = 1; index < csvArr.length;index++){
		//console.log(csvArr[i]);
		var month = year = day = "";
		if(date != csvArr[index][4]){
			date = csvArr[index][4];
			var dateArr = date.split("/");
			if(/^\s/.test(dateArr[0]) ){
				month = dateArr[0].substring(1);
				if(month.length<2){
					month = "0" + month;
				}
			} 
			else{
				month = dateArr[0];
				if(month.length<2){
					month = "0" + month;
				}
				
			}

			if(dateArr[2] == 16){
				year = 2016;
			}
			else if(dateArr[2] == 17) {
				year = 2017;
			}
			else{
				year = dateArr[2]
			}

			if(dateArr[1].length > 1){
				day = dateArr[1];
			}
			else{
				day = "0" + dateArr[1];
			}

			dateString = year + month + day;
			callApi(dateString, date, index);
			
		}

	}
}

function changeCSVArr(){
	// for(var i = 1; i <csvArr.length;i++){
	// 	//changed LA to los angeles 
	// 	// if(csvArr[i][1].includes('LA')){
	// 	// 	var newLA = csvArr[i][1].replace('LA', 'Los Angeles');
	// 	// 	csvArr[i][1] = newLA;
	// 	// }
	// 	// if (csvArr[i][0].includes('LA')){
	// 	// 	var newLA = csvArr[i][0].replace('LA', 'Los Angeles');
	// 	// 	csvArr[i][0] = newLA;
	// 	// };

	// 	//set date to same format
	// 	// if(/\s/.test(csvArr[i][4]) ){
	// 	// 	var lessSpace = csvArr[i][4].substring(1)
	// 	// 	csvArr[i][4] = lessSpace;

	// 	// }

	// 	// if(csvArr[i][0].substring(0,1) == " "){
	// 	// 	var lessSpace = csvArr[i][0].substring(1)
	// 	// 	csvArr[i][0] = lessSpace;
	// 	// }

	// 	// //strips last whitespace of string
	// 	// if(/\s+$/.test(csvArr[i][0])){
	// 	// 	var lessSpace = csvArr[i][0].substring(0, csvArr[i][0].length - 1)
	// 	// 	csvArr[i][0] = lessSpace;
	// 	// }	

	// 	// //strips last whitespace of string
	// 	// if(/\s+$/.test(csvArr[i][2]) ){
	// 	// 	var lessSpace = csvArr[i][2].substring(0, csvArr[i][2].length - 1)
	// 	// 	csvArr[i][2] = lessSpace;
	// 	// }
	// }
	console.log(matchesFound);


	var data = $.csv.fromArrays(csvArr);
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent= csvContent + data;
	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
	
	//console.log(csvArr);
}

function csvData(){
	if( document.getElementById("filebtn").files.length == 0 ){
		alert("no files selected, unable to load progress report");
		return;
	}

	//establishes file reader object
	var fr = new FileReader();
	//grabs file properties with uploaded files
	var files = $("#filebtn").prop('files');

	//grabs the first file object from file reader
	fr.readAsText(files[0]);

	//loads the file information from file object and splits at comma
	fr.onload = function() {
		var importData = this.result;
		//importData = importData.split(",");
		//console.log(importData);
		csvArr = $.csv.toArrays(importData);
		getArrVal();
		changeCSVArr();
		//console.log(csvArr);
		//pops off the last character of string, was irrelevant character
		//importData.pop();
	}
}

function initLoad(){
  //onclick functionality that grabs information from imported files
  $("#loadbtn").click(function() {
    csvData();
  });
}
