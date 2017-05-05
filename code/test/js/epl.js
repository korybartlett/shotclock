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

$(document).ready( function() {
	getVid(PageToken);
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



var patPrem = new RegExp("Premier League");
var patPL = new RegExp("PL"); 
var patMIB = new RegExp("Men In Blazers Off [T|t]he Ball");
var patNBC = new RegExp("NBC");
var patTF = new RegExp('[T|t]op five');
var pat = new RegExp();

function list(data){
	var total = data.pageInfo.totalResults;
	nextPageToken = data.nextPageToken;

	for(var i = 0; i < data.items.length; i++){
		sum++;
		// console.log("The sum: "+ sum);
		// console.log("The total " + total);
		if(sum == total || sum == 610){
			// var top = "<li>" + added + "</li>";
			// console.log("done");
			// console.log(added);
			// $('#results').prepend(top);
			var data = dateArr.join("\n")
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
		
		if(title === 'Private video'){
			continue;
		}
		if(patPrem.test(title) || patPL.test(title) || patMIB.test(title) || patNBC.test(title) || patTF.test(title) ){
			continue;
		}

		var teams = getTeamNames(title);
		if(teams === ''){
			continue;
		}

		var nTitle = title.replace(/,/g , " ");
		var vidId = data.items[i].snippet.resourceId.videoId;
		getdate(title);
		//console.log(date);
		titleArr.push(title);
		outputs = teams + "," + vidId + "," + nTitle + "," + date;
		csvArr.push(outputs);
		outputs = "<li>" + outputs + "</li>";
		$('#results').append(outputs);
		added++;


	}

	if(sum < (total-1)){
		getVid(nextPageToken);
	}
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
	console.log(dateArr);
	console.log(check);
	check++;
	//console.log(date);
}

var premTeam = ["Chelsea", "Tottenham", "Liverpool", "Man City", "Man United", "Manchester United", "Arsenal", "Everton", "West Brom", "Southampton", "Bournemouth", "Leicester", "Stoke", "Watford", "Burnley", "West Ham", "Crystal Palace", "Hull", "Swansea", "Middlesbrough", "Sunderland"]

function getTeamNames(title){
	var count = 0;
	var teams = [];

	for(var j = 0; j < premTeam.length; j++){
		if(title.includes(premTeam[j]) ){
			count++;
			if(j == 3){
				teams.push("Manchester City")
				continue;
			}
			if(j == 4){
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
