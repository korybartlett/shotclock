//var playlistId = 'PL31NN8Vu_FZ_ZEABi73pW_0YXqbOJ_76-'; //old playlist
var playlistId = 'PLQNqwCpoZBfcfbWpT3cxXtCmn8arr6Tzs';
var vidIdList = [];
var csvArr = [];
var monthsObj = {"January": 1, "February": 2, "Mar": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "Dec": 12, "March": 3, "Apr": 4, "Feb": 2};

$(document).ready(function() {
	$.get(
	    "https://www.googleapis.com/youtube/v3/search", {
	        q: "full game ",
	        part: 'snippet',
	        order: 'date',
	        key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
	        maxResults: 50,
	        publishedAfter: "2017-02-25T00:00:00Z",
	        publishedBefore: "2017-03-01T00:00:00Z",
	        channelId: 'UCR_eeue4E0jNBz8A55DOuOg'
	    },
	    function(data) {
            var outputs;
            $.each(data.items, function(i, item) {
                var csvString = "";
                console.log(item);

                var vidId = item.id.videoId;
                var vidTitle = item.snippet.title;
                var vidTitleArray = vidTitle.split("-");
                
                //get team names
                var teams = vidTitleArray[0].split("vs");
                var aTeam = teams[0];
                var bTeam = teams[1];
                bTeam = bTeam.slice(1);

                //get date
                var vidDate = vidTitleArray[1].split("|");
                var date = vidDate[1];
               	console.log(date);
                date = date.substring(1, date.length-1);
                date = date.replace (/,/g, "");
                date = date.replace(/\s+/g, '/');

                var month = monthsObj[date.split("/")[0]];

                date = date.slice(date.split("/")[0].length);
                
                csvString+=aTeam;
                csvString+=", "
                outputs = '<li>' + aTeam + '</li>';
                $('#results').append(outputs);

                csvString+=bTeam;
                csvString+=", "
                outputs = '<li>' + bTeam + '</li>';
                $('#results').append(outputs);
                
                date = month + date;
                csvString+=date;
                csvString+=", "
                outputs = '<li>' + date + '</li>';
                $('#results').append(outputs);

                csvString+=vidId;
                //csvString+="\n"
                outputs = '<li>' + vidId + '</li>';
                $('#results').append(outputs);

                console.log(csvString);
                csvArr.push(csvString);
                // console.log(vidId);
                //vidIdList.push(vidId);
                //makeFrame(vidId);
    		})
			var data = csvArr.join("\n");
			console.log(data);
			var csvContent = "data:text/csv;charset=utf-8,";
			csvContent= csvContent + data;
    		var encodedUri = encodeURI(csvContent);
      		window.open(encodedUri);
        }

		

    );

	
});

//get request for searching channel
// $.get(
// 	    "https://www.googleapis.com/youtube/v3/search", {
// 	        q: "full game highlights",
// 	        part: 'snippet',
// 	        order: 'relevance',
// 	        key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
// 	        maxResults: 50,
// 	        channelId: 'UCR_eeue4E0jNBz8A55DOuOg'
// 	    },

/*
function createFrame(){
	// $(window).load(function() {
	console.log(vidIdList);
	// var videoId = vidIdList[0];
	// console.log(videoId);

	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.
	var player;

	function onYouTubeIframeAPIReady() {
	    player = new YT.Player('player', {
	        height: '390',
	        width: '640',
	        videoId: vidIdList[0],
					//playlist: "PLD8amBJiZ9dx0IXEDHJVhdzHkaPBeEHXi",

					events: {
	            'onReady': onPlayerReady,
	            //'onStateChange': onPlayerStateChange
	        }
	    });
	}

	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
	    event.target.playVideo();
	}

	// 5. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	// var done = false;
	// function onPlayerStateChange(event) {
	//   if (event.data == YT.PlayerState.PLAYING && !done) {
	//     setTimeout(stopVideo, 10000);
	//     done = true;
	//   }
	// }
	// function stopVideo() {
	//   player.stopVideo();
	// }
	// });

}
*/


// Search for a specified string.
function search() {
    var userInput = $('#team').val() + " " + $('#datepicker').val();
    var vidId;
    console.log(userInput);
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            q: userInput,
            part: 'snippet',
            order: 'relevance',
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
            maxResults: 1,
            channelId: 'UCOYuAoGMa3BeQ-Wr5mgz4NQ'
        },
        function(data) {
            //console.log(data);
            $.each(data.items, function(i, item) {
                console.log(item.id.videoId);
								var vidTitle = item.snippet.title;
                outputs = '<li>' + vidTitle + '</li>';
                $('#results').append(outputs);
								var vidId = item.id.videoId;
                vidIdList.unshift(vidId);
								console.log(vidIdList);
            });
            //document.getElementById('player').src='http://youtube.com/embed/'+vidId+'?autoplay=1&rel=0&showinfo=0&autohide=1'
						vidIdListString = vidIdList.toString();
						$('#player').attr('src', "http://www.youtube.com/embed/VIDEO_ID?playlist=" + vidIdListString);
        }

    );
}

$(function() {
    $("#datepicker").datepicker();
    $("#datepicker").val();
});

// adding video to queue
// loadVideoById({
// 	'videoId': "MmCQwfpJ7-U"
// });


// var d = new Date();
// var n = d.toDateString();
// // n = '<p>'+n+'</p>';
// //"<p>"+n+"</p>")
// $('#date').append("<p>test</p>");
// console.log(n);
