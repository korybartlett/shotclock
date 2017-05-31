var playlistId = 'PLQNqwCpoZBfetQpUKU3Kpksm8AfSivirs';
var vidIdList = [];
var monthsObj = {"January": 1, "February": 2, "Mar": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "Dec": 12, "March": 3, "Apr": 4, "Feb": 2, "Jan": 1, "Nov": 11, "Oct": 10};
var initID = "";
var queueCount = 0;
var videosWatched = [];
var queuedVideos = [];

//used in changeCustomize
var favBaskArr = [];
var favSocArr = [];
var username = "";
var userJSON;

$(document).ready(function () {
    //gets current date and previous weeke date
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    //var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
    var todayString = today.toISOString().slice(0,10);
    var lastWeekString = lastWeek.toISOString().slice(0,10);
    //console.log(todayString);
    //console.log(lastWeekString);
    //$.get(
        //"https://www.googleapis.com/youtube/v3/playlistItems", 
       // "http://localhost:9200/deployshotclock/_search?q=datePlayed%3A["+lastWeekString+"%20TO%20"+todayString+"]&size=8",
    //get request to get youtube playlist to load todays games into results
    var score = 0;
    var requestParam;
    console.log("outside if statement", window.location.pathname);
    if (window.location.pathname == '/home' || window.location.pathname == '/') {
        requestParam = "http://localhost:9200/deployshotclock/_search?q=datePlayed%3A["+lastWeekString+"%20TO%20"+todayString+"]&size=4";
    }
    else if (window.location.pathname == '/nba') {
        requestParam = "http://localhost:9200/deployshotclock/nba/_search?q=datePlayed%3A[2017-04-10%20TO%202017-04-12]&size=4";
    }
    else {
        requestParam = "http://localhost:9200/deployshotclock/epl/_search?q=datePlayed%3A["+lastWeekString+"%20TO%20"+todayString+"]&size=4";
    }
    //$.get(
    $.ajax({
        url: requestParam,
        type: "GET",
        dataType: 'json',
        headers: {'Access-Control-Allow-Origin':'*'},
          success: function(response) {
            run(response);
          },
          error: function(){
            console.log("This shit failed");
          }
    });

    //save the count of the queue
    queueCount = i;
    queuedVideos.push(vidId);
        
});

function run(data) {
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
      videoId: 'eDTz6k6ctZs',
      //another option to set video to autoplay 
      playerVars: {'autoplay':0 },
      //creates events to use with youtube player
      events: {
        //'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

/*LOAD THE VIDEO WE WANT FUNCTION*/
function loadVideo(){
    getVideoID(function(returnID){
        initID = returnID;
        //saves ID of video watched
        videosWatched.push(initID);
    });        
}

//function to play the video
function onPlayerReady(event) {
    player.loadVideoById(initID);
    //event.target.playVideo();
}

//function for checking the iframe player state
function onPlayerStateChange(event) {
    //0 when video ends
    if (event.data === 0) {
      queueToPlayer();
    }
}

function moveToQueue(vidId) {

    //ensures queue stays within view port
    if(queueCount > 6){
        console.log("Queue full, cannot add videos");
        return;
    }

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

    //monitors the queue count
    queueCount++;
    queuedVideos.push(vidId);
    console.log("expanded queue array: ",queuedVideos)

    //delete after testing
    // var end = player.getDuration();
    // end = end - 1;
    // player.seekTo(end, true);
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

    
    //grabs the image source attribute
    var imgSrc = $('.theQueue-ul-img:first-child img').attr('src');

    //removes the first element from the queue
    $('.theQueue-ul li:first-child').remove();

    console.log("image source", imgSrc);
    //saves the sport type
    var sportType;
    if (/soccer/.test(imgSrc)) {
        sportType='soccer';
    }
    else {
        sportType = 'basketball';
    }


    //add underscores to the team names, replaces spaces with underscores
    var topTeamNamePNG = topTeamName.replace(/ /g,'_');
    var botTeamNamePNG = botTeamName.replace(/ /g,'_');

    //adds correct team images to the main scoreboard
    $('#currentScore-leftTeam').attr('src', '../images/'+sportType+'/150px/'+topTeamNamePNG+'.png');
    $('#currentScore-rightTeam').attr('src', '../images/'+sportType+'/150px/'+botTeamNamePNG+'.png');


    //loads video to video player with video ID
    player.loadVideoById(queueId);
    $('div.currentScore-leftSide > h2').replaceWith('<h2>'+topScore+'</h2>');
    $('div.currentScore-rightSide > h2').replaceWith('<h2>'+botScore+'</h2>');

    //check if teamName in favTeam array, then increment count
    if(sportType == 'soccer'){
        //checks if topTeamName exsists in corresponding array
        //if found increment watch, else add to array
        if(favSocArr.hasOwnProperty(topTeamName)){
            favSocArr[topTeamName]++;
        }
        else{
            favSocArr[topTeamName] = 1;
        }

        //checks if botTeamName exsists in corresponding array
        //if found increment watch, else add to array
        if(favSocArr.hasOwnProperty(botTeamName)){
            favSocArr[botTeamName]++;
        }
        else{
            favSocArr[botTeamName] = 1;
        }
    }

    if(sportType == 'basketball'){
        //checks if topTeamName exsists in corresponding array
        //if found increment watch, else add to array
        if(favBaskArr.hasOwnProperty(topTeamName)){
            favBaskArr[topTeamName]++;
        }
        else{
            favBaskArr[topTeamName] = 1;
        }

        //checks if botTeamName exsists in corresponding array
        //if found increment watch, else add to array
        if(favBaskArr.hasOwnProperty(botTeamName)){
            favBaskArr[botTeamName]++;
        }
        else{
            favBaskArr[botTeamName] = 1;
        }
    }

    //check if queueID exsits in array
    var idIndex = queuedVideos.indexOf(queueId);

    console.log("queuedVideos array before removal: ", queuedVideos)

    //if the video ID exsists in queue array remove it
    if(idIndex > -1){
        queuedVideos.splice(idIndex, 1);
    }

    console.log("queuedVideos array after removal: ", queuedVideos)

    //decrement queue count
    queueCount--;
    
    //adds videoID to videos watched log
    videosWatched.push(queueId);

    //function to check queue size. Refresh queue to keep it full
    if(queueCount < 1){
        console.log("queue has space: ", queueCount);
        //add more videos to queue as it gets empty
    }
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
        "http://localhost:9200/deployshotclock/_search?q="+userInput+"&size=8",

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

                var dominantTeam = dominantTeam.replace(/ /g,'_');
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

function searchVideoLogIn(){
    //removes the first element from the queue
    $('.searchResults-ul li').remove();
    var userFavSearch = "";
    var key;
    console.log(favBaskArr);
    for ( key in favBaskArr) {
        userFavSearch = userFavSearch + "+" + key;
        //console.log(key);
    }
    for( key in favSocArr){
        userFavSearch = userFavSearch + "+" + key;
        //console.log(key);
    }

    //console.log(userFavSearch);
    //ajax call to search youtube videos on specific channel !!still need to edit for search!!
    //var userInput = $('#search').val();
    userInput = userFavSearch;
    //userInput+=" Full Game";
    console.log(userInput);
    $.get(
        "http://localhost:9200/deployshotclock/_search?q="+userInput+"&size=8",

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

                var dominantTeam = dominantTeam.replace(/ /g,'_');
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

function getVideoID(func){
    //NEED TO REPLACE WITH AJAX CALL TO ELASTIC SEARCH
    var userInput = "sacramento kings";
    userInput+=" Full Game";
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            q: userInput,
            part: 'snippet',
            order: 'relevance',
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
            maxResults: 1,
            channelId: 'UCR_eeue4E0jNBz8A55DOuOg'
        },
        //function traverses through received items
        function (data) {
            var outputs;
            var score = 0;
            $.each(data.items, function (i, item) {
                console.log(item);
                //saves the video ids to the array
                var vidId = item.id.videoId;
                //pushes video ids to an array
                var aScore, bScore;
                score++;
                aScore = score;
                bScore = 10 - score;
                //console.log(item.snippet.thumbnails.default.url);

                console.log(item.snippet.title);
                
                //video title
                //Cleveland Cavaliers vs Indiana Pacers - Full Game Highlights | Game 3 | Apr 20, 2017 | NBA Playoffs

                videoID = vidId;
                console.log("get request value: ",videoID);
                func(videoID);
            })
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
