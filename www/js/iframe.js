var playlistId = 'PL31NN8Vu_FZ_ZEABi73pW_0YXqbOJ_76-';
var vidIdList = [];

$(document).ready(function() {
    //get request to get youtube playlist
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            playlistId: playlistId,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        //function traverses through received items
        function(data) {
            var outputs;
            $.each(data.items, function(i, item) {
                console.log(item);
                //saves the video ids to the array
                var vidId = item.snippet.resourceId.videoId;
                //pushes video ids to an array
                vidIdList.push(vidId);
                
                //console.log(item.snippet.thumbnails.default.url);
                var listItem = [
                    '<li id="'+vidId+'" class="searchResults-item"><div class="searchResults-ul-img" >',
                    '<img src=" '+item.snippet.thumbnails.default.url+' " onclick="moveToQueue(\''+vidId+'\');"> <!-- the thumbnail --></div>',
                    '<div class="searchResults-ul-li">',
                    '<h6>Team A - 2</h6> <!-- Team 1 and score -->',
                    '<h6>Team B - 1</h6> <!-- Team 2 and score -->',
                    '<h6>1/21/2017</h6> <!-- Date --></div></li>'
                ];
                
                //appends the items to the search list 
                $(".searchResults-ul").append(listItem.join(''));

    		})
        }
    ); 

});


console.log(vidIdList);

function moveToQueue(vidId) {
    var movId;
    //ajax calss to youtube videos
    $.get(
        "https://www.googleapis.com/youtube/v3/videos", {
            part: 'snippet',
            id: vidId,
            maxResults: 1,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        //function traverses through received items
        function(data) {
            var outputs;
            $.each(data.items, function(i, item) {
                console.log(item);
                //saves the video ids to the array
                movId = item.id;
                //console.log(movId)
               // vidIdList.push(vidId);
                
                //console.log(item.snippet.thumbnails.default.url);
                var listItem = [
                    '<li id="'+movId+'" class="theQueue-item"><div class="theQueue-ul-img" >',
                    '<img src=" '+item.snippet.thumbnails.default.url+' " onclick="moveToQueue(\''+movId+'\');"> <!-- the thumbnail --></div>',
                    '<div class="theQueue-ul-li">',
                    '<h6>Team A - 2</h6> <!-- Team 1 and score -->',
                    '<h6>Team B - 1</h6> <!-- Team 2 and score -->',
                    '<h6>1/21/2017</h6> <!-- Date --></div></li>'
                ];
            })
        }
    ); 
    //console.log(vidId);
    //adds to the top of the Queue
    $('.theQueue-ul').prepend($('#'+vidId).clone());
    //removes the last occurence, which is hopefully in the search result 
    $('#'+vidId+'.searchResults-item').last().remove();
}

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//funcion to create youtbue iFrame player
var player;
function onYouTubeIframeAPIReady() {
    //creates player which replaces div with id=player
    player = new YT.Player('player', {
      height: '400',
      width: '650',
      //creates player with hardcoded ID for now
      videoId: 'jLRFACyYE6Y',
      //creates events to use with youtube player
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

//function for onPlayerReady, plays video
function onPlayerReady(event) {
        event.target.playVideo();
}

 function onPlayerStateChange(event) {
    //0 when video ends
    if (event.data === 0) {
      queueToPlayer();
    }
}

//function to move videos from queue to the player
function queueToPlayer(){
    //grabs the ID attribute from the first element in the queue
    var queueId = $('.theQueue-ul li:first-child').attr('id');
    //removes the first element from the queue
    $('.theQueue-ul li:first-child').remove();
    //console.log(queueId);
    //loads video to video player with video ID
    player.loadVideoById(queueId);
}