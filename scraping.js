var request = require('request'),
    cheerio = require('cheerio'),
    videos = [];

request('http://www.goalopedia.com', function(err, resp, body){
	if (!err && resp.statusCode == 200) {
		var $ = cheerio.load(body);
		//in the context of goals
		$('a', '#goals').each(function() {
			var video = $(this).text();
			videos.push(video);
		});

		console.log(videos);
	}
});
