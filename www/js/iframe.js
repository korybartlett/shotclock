var playlistId = 'PLSkxoWVXRGrfRbyGb1WBEBqgqgJIG8vbt';
var vidIdList = [];
var monthsObj = {"January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12};
var initID = "";
var queueCount = 0;
var videosWatched = [];
var queuedVideos = [];

$(document).ready(function () {
    //get request to get youtube playlist to load todays games into results
    var score = 0;
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",  
        {
            part: 'snippet',
            playlistId: playlistId,
            maxResults: 8,
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA'
        },
        //function traverses through received items
        function (data) {
            var outputs;
            $.each(data.items, function (i, item) {
                console.log(item);
                //saves the video ids to the array
                var vidId = item.snippet.resourceId.videoId;

                //pushes video ids to an array
                vidIdList.push(vidId);
                var aScore, bScore;
                score++;
                aScore = score;
                bScore = 10 - score;
                //console.log(item.snippet.thumbnails.default.url);

                // console.log(item.snippet.title);

                var vidTitle = item.snippet.title;
                var vidTitleArray = vidTitle.split("-");
                
                //get team names
                var teams = vidTitleArray[0].split("vs");
                var aTeam = teams[0];
                var bTeam = teams[1];
                bTeam = bTeam.slice(1);

                //get date
                var vidDate = vidTitleArray[1].split("|");
                var date = vidDate[2];
                date = date.substring(1, date.length-1);
                date = date.replace (/,/g, "");
                date = date.replace(/\s+/g, '/');

                var month = monthsObj[date.split("/")[0]];

                date = date.slice(date.split("/")[0].length);
                if(i != 0){
                    var listItem = [
                        '<li id="'+vidId+'"><div class="theQueue-ul-img" >',
                        '<img src=" '+item.snippet.thumbnails.default.url+' " <!-- the thumbnail --></div>',
                        '<div class="theQueue-ul-li">',
                        '<h6>' + aTeam + ' - '+aScore+' </h6> <!-- Team 1 and score -->',
                        '<h6>' + bTeam + ' - '+bScore+' </h6> <!-- Team 2 and score -->',
                        '<h6>' + month+date + '</h6> <!-- Date --></div></li>'
                    ];
                    
                    //appends the items to the search list 
                    $(".theQueue-ul").append(listItem.join(''));
                    
                    /*NEW CODE*/
                    //save the count of the queue
                    queueCount = i;
                    queuedVideos.push(vidId);
                }

    		})
        }
    );
    
    loadVideo();
});

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//funcion to create youtbue iFrame player
var player;
function onYouTubeIframeAPIReady() {
    console.log("video players creation: ",initID);
    //var id = "GiB86yJlKJE";
    //creates player which replaces div with id=player
    player = new YT.Player('player', {
      height: '400',
      width: '650',
      //creates player with hardcoded ID for now, changes on 'onReady Function'
      videoId: "OcnNikzBA0U",
      //another option to set video to autoplay 
      // playerVars: {'autoplay':0 },
      //creates events to use with youtube player
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

/*LOAD VIDEO FUNCTION*/
function loadVideo(){
    getVideoID(function(returnID){
        initID = returnID;
    });        
}

//function to play the video
function onPlayerReady(event) {
    player.loadVideoById(initID);
    event.target.playVideo();
}

//function for checking the iframe player state
function onPlayerStateChange(event) {
    //0 when video ends
    if (event.data === 0) {
      queueToPlayer();
    }
}


function moveToQueue(vidId) {
    /*NEW CODE*/
    //ensures queue stays within view port
    if(queueCount > 6){
        console.log("Queue full, cannot add videos");
        return;
    }

    //clones the searchResult video item to the queue, copies the entire item data
    //adds to the top of the Queue
    $('.theQueue-ul').prepend($('#'+vidId).clone());

    //removes the last occurence, which is hopefully in the search result 
    $('#' + vidId + '.searchResults-item').last().remove();
    
    //adjusts theQueue class attributes because of cloning
    $('#' + vidId).removeClass('searchResults-item');
    $('#' + vidId + ' .searchResults-ul-img').removeClass('searchResults-ul-img').addClass('theQueue-ul-img');
    $('#' + vidId + ' .searchResults-ul-li').removeClass('searchResults-ul-li').addClass('theQueue-ul-li');
    
    /*NEW CODE*/
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
    var botTeamName = botTeamArray[0];

    //removes the first element from the queue
    $('.theQueue-ul li:first-child').remove();

    //loads video to video player with video ID
    player.loadVideoById(queueId);

    $('div.currentScore-leftSide > h2').replaceWith('<h2>'+topScore+'</h2>');
    $('div.currentScore-rightSide > h2').replaceWith('<h2>'+botScore+'</h2>');
    
    /*New code to add to project*/
    //check if teamName in favTeam array, then increment count
    //else add empty count to array using name
    queueCount--;

    //check if queueID exsits in array
    var idIndex = queuedVideos.indexOf(queueId);

    console.log("queuedVideos array before removal: ", queuedVideos)

    if(idIndex > -1){
        queuedVideos.splice(idIndex, 1);
    }

    console.log("queuedVideos array after removal: ", queuedVideos)

    //adds videoID to videos watched log
    videosWatched.push("videosWatched array:", videosWatched);

    //function to check queue size. Refresh queue to keep it full
    if(queueCount < 1){
        console.log("queue has space: ", queueCount);
    }
}

function searchVideo(){
    //removes the first element from the queue
    $('.searchResults-ul li').remove();

    //ajax call to search youtube videos on specific channel !!still need to edit for search!!
    var userInput = $('#search').val();
    userInput+=" Full Game";
    console.log(userInput);
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            q: userInput,
            part: 'snippet',
            order: 'relevance',
            key: 'AIzaSyDRIWeEmYpopkQBrLH7uthr4YPJU8XxfuA',
            maxResults: 8,
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
                vidIdList.push(vidId);
                var aScore, bScore;
                score++;
                aScore = score;
                bScore = 10 - score;
                //console.log(item.snippet.thumbnails.default.url);

                console.log(item.snippet.title);
                
                //video title
                //Cleveland Cavaliers vs Indiana Pacers - Full Game Highlights | Game 3 | Apr 20, 2017 | NBA Playoffs


                var vidTitle = item.snippet.title;
                var vidTitleArray = vidTitle.split("-");
                
                //get team names
                var teams = vidTitleArray[0].split("vs");
                var aTeam = teams[0];
                var bTeam = teams[1];
                bTeam = bTeam.slice(1);

                //get date
                var vidDate = vidTitleArray[1].split("|");
                var date = vidDate[2];
                date = date.substring(1, date.length-1);
                date = date.replace (/,/g, "");
                date = date.replace(/\s+/g, '/');

                var month = monthsObj[date.split("/")[0]];

                date = date.slice(date.split("/")[0].length);

                // console.log(aScore);
                // console.log(bScore);

                var listItem = [
                    '<li id="'+vidId+'" class="searchResults-item"><div class="searchResults-ul-img" >',
                    '<img src=" '+item.snippet.thumbnails.default.url+' " onclick="moveToQueue(\''+vidId+'\');"> <!-- the thumbnail --></div>',
                    '<div class="searchResults-ul-li">',
                    '<h6>'+ aTeam +' - '+aScore+' </h6> <!-- Team 1 and score -->',
                    '<h6>'+ bTeam +' - '+bScore+' </h6> <!-- Team 2 and score -->',
                    '<h6>'+month+date+'</h6> <!-- Date --></div></li>'
                ];
                
                //appends the items to the search list 
                $(".searchResults-ul").append(listItem.join(''));

            })
        }
    ); 
}

function getVideoID(func){
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
