require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var spotify = require("node-spotify-api");

var command = process.argv[2];

var input = "";

for (var i = 3; i < process.argv.length; i++) {
    if (i !== 3) input += " ";
    input += process.argv[i];
}


function movie(title) {

    if (title === "") {
        title = "Mr. Nobody";

    };

    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body).Title);
            console.log("Year it came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}


function band(artist) {


    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Upcoming concerts for " + artist + ":")
            for (let i = 0; i < 6; i++) {
                var venue = JSON.parse(body)[i].venue.name;
                var location = JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region;
                var date = moment(JSON.parse(body)[i].datetime, "YYYY-MM-DD").format("MM/DD/YYYY");
            
            console.log(location + " at " + venue + " " + date);
            }
        }
    });
}


function getSpotify (songTitle) {

    // if (songTitle === "") {
    //     songTitle = "The Sign";
    // };
    
    
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
      

        console.log(data[i]);

        // for (var i = 0; i < 5; i++) {

        //     // var artist = data.tracks.items[0].artists[0].name;
        //     // var song = data.tracks.items[0].name;
        //     // var link = data.tracks.items[0].external_urls.spotify;
        //     // var album = data.tracks.items[0].album.name;
        
        //       console.log([i]);


        // }
        
    
    
    });


    


}

// fs.readFile("random.txt", "utf8", function(error, data) {
// 	//declare a variable, split the text in data by ",", store it as an array
	
// 	// concert-this,lil xan
// 	//  ↑ 0th        ↑1st
	
// 	// var media = the 1st index
	
// 	// if (the 0th index == spotify / movie/ concert) { 
// 	// do the things according to the if condition
// 	// }
// }

if (command === "movie-this") {
    movie(input);

} else if (command === "concert-this") {
    band(input);

} else if (command === "spotify-this-song") {
    getSpotify(input);

} else if (command === "do-what-it-says") {


}

