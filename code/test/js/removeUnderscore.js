var csvArr = [];

$(document).ready( function() {
	initLoad();
});

function removeUnder(){
	for(var i = 1; i < csvArr.length; i++){
		var team1 = csvArr[i][0];
		var team2 = csvArr[i][2];

		team1 = team1.replace(/_/g," ");
		team2 = team2.replace(/_/g," ");

		csvArr[i][0] = team1;
		csvArr[i][2] = team2;
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
		csvArr = $.csv.toArrays(importData);
		removeUnder();
		console.log(csvArr);
		var data = $.csv.fromArrays(csvArr);
		var csvContent = "data:text/csv;charset=utf-8,";
		csvContent= csvContent + data;
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	}
}

function initLoad(){
  //onclick functionality that grabs information from imported files
  $("#loadbtn").click(function() {
    csvData();
  });
}