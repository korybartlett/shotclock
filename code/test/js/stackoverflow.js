$(document).ready(function() {

    var playlistId = 'PLeqtW_b5-U42wkEp4S8nebgJx5r_bdSwG',
        APIKey = 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
        baseURL = "https://www.googleapis.com/youtube/v3/";

    $.get(baseURL + "playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + APIKey, function(data) {
        // Do what you want with the data
    });
	//load();

});

// function load() {
//     var playListID = "PLeqtW_b5-U42wkEp4S8nebgJx5r_bdSwG";
//     var requestOptions = {
//         playlistId: playListID,
//         part: 'snippet',
//         maxResults: 10
//     };
//     var apiKey = "AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA";
//     gapi.client.setApiKey(apiKey);
//     gapi.client.load('youtube','v3', function () {  var request = gapi.client.youtube.playlistItems.list(requestOptions);
//                                                     request.execute(function (data) { console.log (data) });
//                                                 });

// }