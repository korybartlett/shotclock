var playlistId = 'PLD8amBJiZ9dx0IXEDHJVhdzHkaPBeEHXi';
var vidIdList = [];
var month = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

$(document).ready(function() {
    // $.get(
    //     "https://www.googleapis.com/youtube/v3/playlistItems", {
    //         part: 'snippet',
    //         playlistId: playlistId,
    //         key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
    //     },
    //     function(data) {
    //         var outputs;
    //         $.each(data.items, function(i, item) {
    //             //console.log(item);
    //             var vidTitle = item.snippet.title;
    //             outputs = '<li>' + vidTitle + '</li>';
    //             $('#results').append(outputs);
    //             var vidId = item.snippet.resourceId.videoId;
    //             // console.log(vidId);
    //             vidIdList.push(vidId);
    //             //makeFrame(vidId);
		// 				})
    //     }
    // );
		//$.get("https://www.googleapis.com/youtube/v3/search");
});
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
	console.log(userInput);
	$.get(
		"https://www.googleapis.com/youtube/v3/search", {
			q: userInput,
	    part: 'snippet',
			order: 'relevance',
			key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
			maxResults: 1,
			channelId: 'UCRUQQrm8_l3CVYxfq2kPMlg'
		},
		function (data) {
			//console.log(data);
			$.each(data.items, function(i, item){
						console.log(item.id.videoId);
			});

		}

	);
}

$( function() {
    $( "#datepicker" ).datepicker();
		$("#datepicker").val();
  } );

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
