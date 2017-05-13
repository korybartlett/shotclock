playlistId = "PLQNqwCpoZBfcfbWpT3cxXtCmn8arr6Tzs";
var csvArr = [];
var thumbArr = [];
$(document).ready( function() {
	initLoad();
});

function APICall(index){
	var thumb;
	$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems",  
		{
			async: false,
		    part: 'snippet',
		    playlistId: playlistId,
		    maxResults: 1,
		    videoId: csvArr[index][4],
		    key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
		},
		//function traverses through received items
		function (data) {
		    var outputs;
		    console.log(data.items[0]);
		 //    $.each(data.items, function (i, item) {
		 //        //console.log(item);
		 //        //console.log(videoID);
			//  	console.log(item.snippet.thumbnails.default.url);
			csvArr[index][6] = data.items[0].snippet.thumbnails.default.url;
			console.log(csvArr[index][6]);

			// })
		}
	);
	return thumb;
}

function getThumb(){
	j = 1;

	// while(j != csvArr.length){
	// 	APICall(j);
	// 	return;
	// }

	for(var index = 1; index < 12; index++){
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems",  
			{
				async: false,
			    part: 'snippet',
			    playlistId: playlistId,
			    maxResults: 1,
			    videoId: csvArr[index][4],
			    key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
			},
			//function traverses through received items
			function (data) {
			    var outputs;
			    console.log(data.items[0]);
			 //    $.each(data.items, function (i, item) {
			 //        //console.log(item);
			 //        //console.log(videoID);
				//  	console.log(item.snippet.thumbnails.default.url);
				//csvArr[index][6] = data.items[0].snippet.thumbnails.default.url;
				//console.log(csvArr[index][6]);

				// })

				thumbArr.push(data.items[0].snippet.thumbnails.default.url);
			}
		);
	}
	
	

}


function toCSV(){
	console.log(thumbArr);
	// var data = thumbArr.join("\n");
	// var csvContent = "data:text/csv;charset=utf-8,";
	// csvContent= csvContent + data;
	// var encodedUri = encodeURI(csvContent);
	// window.open(encodedUri);
}

function csvData(){
	if( document.getElementById("filebtn").files.length == 0 ){
		alert("no files selected, unable to load progress report");
		return;
	}
	var j;
	//establishes file reader object
	var fr = new FileReader();
	//grabs file properties with uploaded files
	var files = $("#filebtn").prop('files');

	//grabs the first file object from file reader
	fr.readAsText(files[0]);

	//loads the file information from file object and splits at comma
	fr.onload = function() {
		var importData = this.result;
		csvArr = $.csv.toArrays(importData);
		getThumb();
		//console.log(csvArr);
		
		toCSV();
	}	
}

function initLoad(){
  //onclick functionality that grabs information from imported files
  $("#loadbtn").click(function() {
    csvData();
  });
}