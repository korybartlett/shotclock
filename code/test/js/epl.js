var playlistId = 'PLXEMPXZ3PY1gztEAa0MhLeZVEBFYyG1YL';
var nextPageToken;
var PageToken; 
var sum = 0;
var added = 0;
var csvArr = [];
var titleArr = [];
var dateArr = [];
var check = 1;
var checkArr = [];
var loadedCSV = [];

$(document).ready( function() {
	initLoad();
	$('#loadbtn2').click(runAPI);
});

function getVid(PageToken){
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",  
        {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 50,
            pageToken: PageToken,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        function(data){
        	list(data);
        }
    );
}



var patPrem = new RegExp("Premier League Preview");
//var patPL = new RegExp("PL"); 
var patMIB = new RegExp("Men In Blazers Off [T|t]he Ball");
var patNBC = new RegExp("NBC");
var patTF = new RegExp('[T|t]op five');
var patPPR = new RegExp('[P|p]layer [P|p]ower [R|r]ankings');
var pat = new RegExp();

function list(data){
	var total = data.pageInfo.totalResults;
	nextPageToken = data.nextPageToken;

	for(var i = 0; i < data.items.length; i++){
		sum++;
		// console.log("The sum: "+ sum);
		// console.log("The total " + total);
		if(sum == total || sum == 800){
			// var top = "<li>" + added + "</li>";
			// console.log("done");
			// console.log(added);
			// $('#results').prepend(top);
			
			console.log(csvArr);
			//var data = $.csv.fromArrays(csvArr);
			var data = csvArr.join("\n")
			var csvContent = "data:text/csv;charset=utf-8,";
			csvContent= csvContent + data;
			var encodedUri = encodeURI(csvContent);
			window.open(encodedUri);
			return;
		}
		//console.log(total);

		var outputs = "";
		date = "";

		var title = data.items[i].snippet.title;
		var nTitle = title.replace(/,/g , " ");
		var vidId = data.items[i].snippet.resourceId.videoId;

		if(title === 'Private video'){
			continue;
		}

		if(patPrem.test(title) || patPPR.test(title) || patMIB.test(title) || patNBC.test(title) || patTF.test(title) ){
			continue;
		}

		var teams = getTeamNames(title);
		if(teams === ''){
			console.log("Skipped game title: "+title);
			continue;
		}

		

		//getdate(title);
		//console.log(date);
		titleArr.push(title);
		outputs = teams + "," + vidId + "," + nTitle;// + "," + date;
		csvArr.push(outputs);
		outputs = "<li>" + outputs + "</li>";
		$('#results').append(outputs);
		added++;

		// if(vidId == loadedCSV[1][4]){
		// 	sum = 609;
		// 	total = sum + 1;
		// 	console.log("FOUND A MATCH");
		// }

		// if('gFQFPYMm8_M' == vidId){
		// 	sum = 609;
		// 	total = sum + 1;
		// 	console.log("FOUND A BAd MATCH");
		// }

	}

	if(sum < (total-1)){
		getVid(nextPageToken);
	}
}

function sendTitle(){
	for(var i = 1; i < loadedCSV.length; i++){
		getdate(loadedCSV[i][6]);
	}
	console.log(dateArr);

}

function getdate(title){
	$.get(
        "https://www.googleapis.com/youtube/v3/search",  
        {
            part: 'snippet',
            q: title,
            maxResults: 1,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        function(data){
        	grab(data);
        }
    );
}

function grab(data){
	var tempDate = data.items[0].snippet.publishedAt;
	//console.log(tempDate);
	date = tempDate.substring(0,10);
	dateArr.push(date);
	//console.log(dateArr);
	console.log(check);
	check++;
	console.log(check);
	if(check == loadedCSV.length-1){
		var data = dateArr.join("\n")
		var csvContent = "data:text/csv;charset=utf-8,";
		csvContent= csvContent + data;
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	}
	//console.log(date);
}

var premTeam = ["Chelsea", "Tottenham", "Liverpool", "Man City", "Man United", "Manchester United", "Arsenal", "Everton", "West Brom", "Southampton", "Bournemouth", "Leicester", "Stoke", "Watford", "Burnley", "West Ham", "Crystal Palace", "Hull", "Swansea", "Middlesbrough", "Sunderland", "Palace", "Manchester City", "Man Utd", "WBA"]

function getTeamNames(title){
	var count = 0;
	var teams = [];

	for(var j = 0; j < premTeam.length; j++){
		if(title.includes(premTeam[j]) ){
			count++;
			if(j == 3 || j == 22){
				teams.push("Manchester City")
				continue;
			}
			if(j == 4 || j == 23){
				teams.push("Manchester United");
				continue;
			}
			if(j == 11){
				teams.push("Leicester City");
				continue;
			}
			if(j == 12){
				teams.push("Stoke City");
				continue;
			}
			if(j == 17){
				teams.push("Hull City");
				continue;
			}
			if(j == 18){
				teams.push("Swansea City");
				continue;
			}
			if(j == 21){
				teams.push("Crystal Palace");
				continue;
			}
			if(j == 24){
				teams.push("West Brom");
			}
			teams.push(premTeam[j]);
			//teams = teams + premTeam[j] + " ";
		}
		if(count == 2){
			break;
		}
	}

	if(teams.length == 2){
		return teams.join();
	}
	else{
		return "";
	}
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
		loadedCSV = $.csv.toArrays(importData);
		console.log(loadedCSV);
		// var data = $.csv.fromArrays(csvArr);
		// var csvContent = "data:text/csv;charset=utf-8,";
		// csvContent= csvContent + data;
		// var encodedUri = encodeURI(csvContent);
		// window.open(encodedUri);
	}
}

function runAPI(){
	//getVid(PageToken);
	sendTitle();
	console.log(dateArr);
}

function initLoad(){
  //onclick functionality that grabs information from imported files
  $("#loadbtn").click(function() {
    csvData();
  });
}