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
                vidIdList.push(vidId);
                
                console.log(item.snippet.thumbnails.default.url);
                var listItem = [
                    '<li id="'+vidId+'" class="searchResults-item"><div class="searchResults-ul-img" >',
                    '<img src=" '+item.snippet.thumbnails.default.url+' " onclick="moveToQueue(\''+vidId+'\');"> <!-- the thumbnail --></div>',
                    '<div class="searchResults-ul-li">',
                    '<h6>Team A - 2</h6> <!-- Team 1 and score -->',
                    '<h6>Team B - 1</h6> <!-- Team 2 and score -->',
                    '<h6>1/21/2017</h6> <!-- Date --></div></li>'
                ];
        
                $(".searchResults-ul").append(listItem.join(''));

    		})
        }
    ); 

});


console.log(vidIdList);

function moveToQueue(vidId) {
    var movId;
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
        
                //$(".theQueue-ul").prepend(listItem.join(''));

            })
        }
    ); 
    //find the current li we are at
    //save the data from the list item
    console.log(vidId);
    //$('#'+vidId).clone(true).inserAfter('theQueue-ul');
    $('.theQueue-ul').prepend($('#'+vidId).clone());
    
    $('#'+vidId+'.searchResults-item').last().remove();
}