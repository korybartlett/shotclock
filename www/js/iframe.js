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
                    '<li><div class="searchResults-ul-img">',
                    '<img src="'+item.snippet.thumbnails.default.url+'"> <!-- the thumbnail --></div>',
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