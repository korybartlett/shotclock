var playlistId = 'PLIqH-UbFXUsWh_d_tplAaGFUgbBwXE6k7';
var vidIdList = [];

$(document).ready(function () {
    //get request to get youtube playlist
    var score = 0;
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",  
        {
            part: 'snippet',
            playlistId: playlistId,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        //function traverses through received items
        function (data) {
            var outputs;
            $.each(data.items, function (i, item) {
                //console.log(item);
                //saves the video ids to the array
                var vidId = item.snippet.resourceId.videoId;
                //pushes video ids to an array
                vidIdList.push(vidId);
                var aScore, bScore;
                score++;
                aScore = score;
                bScore = 10 - score;
                //console.log(item.snippet.thumbnails.default.url);
                var listItem = [
                    '<li id="'+vidId+'" class="searchResults-item"><div class="searchResults-ul-img" >',
                    '<img src=" '+item.snippet.thumbnails.default.url+' " onclick="moveToQueue(\''+vidId+'\');"> <!-- the thumbnail --></div>',
                    '<div class="searchResults-ul-li">',
                    '<h6>Team A - '+aScore+' </h6> <!-- Team 1 and score -->',
                    '<h6>Team B - '+bScore+' </h6> <!-- Team 2 and score -->',
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
    
    //ajax call to youtube videos
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
                //saves the video id to a variable for later use
                movId = item.id;
            })
        }
    ); 

    //clones the searchResult video item to the queue, copies the entire item data
    //adds to the top of the Queue
    $('.theQueue-ul').prepend($('#'+vidId).clone());

    //removes the last occurence, which is hopefully in the search result 
    $('#' + vidId + '.searchResults-item').last().remove();
    
    //adjusts theQueue class attributes because of cloning
    $('#' + vidId).removeClass('searchResults-item');
    $('#' + vidId + ' .searchResults-ul-img').removeClass('searchResults-ul-img').addClass('theQueue-ul-img');
    $('#' + vidId + ' .searchResults-ul-li').removeClass('searchResults-ul-li').addClass('theQueue-ul-li');


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
      videoId: 'o5aYww6nf0s',
      //creates events to use with youtube player
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

//function for playing the video
function onPlayerReady(event) {
        event.target.playVideo();
}

//function for checking the iframe player state
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

    //function will be used to grab scores 
    //jquery searches using the videoId, aka its queueId, then grabs only the text from the html element containing the team name and scores
    var topTeam = $('#' + queueId + ' .theQueue-ul-li h6:first-child').text();
    var botTeam = $('#' + queueId + ' .theQueue-ul-li h6:nth-child(2)').text();

    //splits fields into an array = {'Team', name of team, '-' ,score}
    var topTeamArray = topTeam.split(" ");
    var botTeamArray = botTeam.split(" ");

    //saves the scores from the returned results
    var topScore = topTeamArray[3];
    var botScore = botTeamArray[3];

    //saves the name of the team 
    var topTeamName = topTeamArray[1];
    var botTeamName = botTeamArray[1];

    //removes the first element from the queue
    $('.theQueue-ul li:first-child').remove();

    //loads video to video player with video ID
    player.loadVideoById(queueId);
    $('div.currentScore-leftSide > h2').replaceWith('<h2>'+topScore+'</h2>');
    $('div.currentScore-rightSide > h2').replaceWith('<h2>'+botScore+'</h2>');
}