var playlistId = 'PLQNqwCpoZBfetQpUKU3Kpksm8AfSivirs';
var vidIdList = [];
var monthsObj = {"January": 1, "February": 2, "Mar": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "Dec": 12, "March": 3, "Apr": 4, "Feb": 2, "Jan": 1, "Nov": 11, "Oct": 10};
$(document).ready(function () {
    //get request to get youtube playlist to load todays games into results
    var score = 0;
    $.get(
        //"https://www.googleapis.com/youtube/v3/playlistItems", 
        "http://localhost:9200/deployshotclock/_search?q=datePlayed%3A[2017-05-01%20TO%202017-05-08]&size=8",
        //{
        //    part: 'snippet',
        //    playlistId: playlistId,
        //    maxResults: 8,
        //    key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        //},
        //function traverses through received items
        function (data) {
            gooooo = data;
            betterParse = gooooo.hits.hits;
            for(var i=0; i<betterParse.length; i++) {
                var info = betterParse[i]._source;
                var sportType = betterParse[i]._type;
                var mainSport;
                var dominantTeam;
                if (sportType=='epl') {
                    mainSport = 'soccer';
                } 
                else {
                    mainSport = 'basketball';
                }
                if (info.homeTeamScore >= info.awayTeamScore) {
                    dominantTeam = info.homeTeam;
                }
                else {
                    dominantTeam = info.awayTeam;
                }
                var imgSrc = '../images/'+mainSport+'/150px/'+dominantTeam+'.png'
                var listItem = [
                    '<li id="'+info.videoID+'" class = "theQueue-item" ><div class="theQueue-ul-img" >',
                    //'<img src=" '+item.snippet.thumbnails.default.url+' " + onclick="moveToQueue(\''+info.videoID+'\');"> <!-- the thumbnail --></div>',
                    '<img src="'+imgSrc+'" onclick="moveToQueue(\''+info.videoID+'\');"></div>',
                    '<div class="theQueue-ul-li">',
                    '<h6>' + info.homeTeam + ' - '+info.homeTeamScore+' </h6> <!-- Team 1 and score -->',
                    '<h6>' + info.awayTeam + ' - '+info.awayTeamScore+' </h6> <!-- Team 2 and score -->',
                    '<h6>' + info.datePlayed + '</h6> <!-- Date --></div></li>'
                ];
                
                //appends the items to the search list 
                $(".theQueue-ul").append(listItem.join(''));

            }
    	}
        
    ); 
});

function moveToQueue(vidId) {

    //clones the searchResult video item to the queue, copies the entire item data
    //adds to the top of the Queue
    //vidId = vidId.slice(1, vidId.length);
    console.log('#'+vidId);
    $('.theQueue-ul').prepend($('#'+vidId).clone());

    //removes the last occurence, which is hopefully in the search result 
    $('#' + vidId + '.searchResults-item').last().remove();

    $('#' + vidId + '.theQueue-item').last().remove();    
    
    //adjusts theQueue class attributes because of cloning
    $('#' + vidId).removeClass('searchResults-item').addClass('theQueue-item');
    $('#' + vidId + ' .searchResults-ul-img').removeClass('searchResults-ul-img').addClass('theQueue-ul-img');
    $('#' + vidId + ' .searchResults-ul-li').removeClass('searchResults-ul-li').addClass('theQueue-ul-li');
    //$('.theQueue-ul-img').prop('onclick', null);


    //delete after testing
    // var end = player.getDuration();
    // end = end - 1;
    // player.seekTo(end, true);
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
      //another option to set video to autoplay 
      playerVars: {'autoplay':0 },
      //creates events to use with youtube player
      events: {
        //'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

//function to play the video
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

    //splits fields into an array = {name of team, score}
    var topTeamArray = topTeam.split("-");
    var botTeamArray = botTeam.split("-");

    //saves the scores from the returned results
    var topScore = topTeamArray[1];
    var botScore = botTeamArray[1];

    //saves the name of the team 
    var topTeamName = topTeamArray[0];
    topTeamName = topTeamName.replace(/\s+/g, "");
    var botTeamName = botTeamArray[0];
    botTeamName = botTeamName.replace(/\s+/g, "");

    
    var imgSrc = $('.theQueue-ul-img:first-child img').attr('src');

    //removes the first element from the queue
    $('.theQueue-ul li:first-child').remove();

    console.log("image source", imgSrc);
    var sportType;
    if (/soccer/.test(imgSrc)) {
        sportType='soccer';
    }
    else {
        sportType = 'basketball';
    }

    $('#currentScore-leftTeam').attr('src', '../images/'+sportType+'/150px/'+topTeamName+'.png');
    $('#currentScore-rightTeam').attr('src', '../images/'+sportType+'/150px/'+botTeamName+'.png');
    //var hello = $('.currentScore-leftSide img').text();
    //onsole.log("hello =" , hello);

    //loads video to video player with video ID
    player.loadVideoById(queueId);
    $('div.currentScore-leftSide > h2').replaceWith('<h2>'+topScore+'</h2>');
    $('div.currentScore-rightSide > h2').replaceWith('<h2>'+botScore+'</h2>');
}

function searchVideo(){
    //removes the first element from the queue
    $('.searchResults-ul li').remove();

    //ajax call to search youtube videos on specific channel !!still need to edit for search!!
    var userInput = $('#search').val();
    userInput = userInput.replace(/\s+/g,"_");
    //userInput+=" Full Game";
    console.log(userInput);
    $.get(
        "http://localhost:9200/deployshotclock/nba/_search?q="+userInput+"&size=8",

        function (data) {
            gooooo = data;
            betterParse = gooooo.hits.hits;
            for(var i=0; i<betterParse.length; i++) {
                var info = betterParse[i]._source;
                console.log(info.homeTeam);
                var sportType = betterParse[i]._type;
                var mainSport;
                var dominantTeam;
                if (sportType=='epl') {
                    mainSport = 'soccer';
                } 
                else {
                    mainSport = 'basketball';
                }
                if (info.homeTeamScore >= info.awayTeamScore) {
                    dominantTeam = info.homeTeam;
                }
                else {
                    dominantTeam = info.awayTeam;
                }
                var imgSrc = '../images/'+mainSport+'/150px/'+dominantTeam+'.png'
                info.videoID = info.videoID.slice(1, info.videoID.length);
                var listItem = [
                    '<li id="'+info.videoID+'" class = "searchResults-item" ><div class="searchResults-ul-img" >',
                    //'<img src=" '+item.snippet.thumbnails.default.url+' " + onclick="moveToQueue(\''+info.videoID+'\');"> <!-- the thumbnail --></div>',
                    '<img src="'+imgSrc+'" onclick="moveToQueue(\''+info.videoID+'\');"></div>',
                    '<div class="searchResults-ul-li">',
                    '<h6>' + info.homeTeam + ' - '+info.homeTeamScore+' </h6>',
                    '<h6>' + info.awayTeam + ' - '+info.awayTeamScore+' </h6>',
                    '<h6>' + info.datePlayed + '</h6> <!-- Date --></div></li>'
                ];
                
                //appends the items to the search list 
                $(".searchResults-ul").append(listItem.join(''));

            }
        }        
    ); 
}

//enter button functionality
$(document).keypress(function(ev){
  if (ev.which == 13) {
    ev.preventDefault();
    searchVideo();
  }
});



$("#form").submit(function() {
    console.log("made it to");
    return false;
});
