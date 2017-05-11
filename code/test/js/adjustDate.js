var csvArr = [];

$(document).ready( function() {
	initLoad();
});

function changeDate(){
	for(var i = 0; i < csvArr.length; i++){
		var date = csvArr[i][5];
		//mm/dd/yyyy
		var dateArr = date.split("/");
		var dateString = dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];

		csvArr[i][5] = dateString;
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
		changeDate();
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