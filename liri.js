require("dotenv").config();



var axios = require("axios");

var userCommand = process.argv[2];

var nodeArgs = process.argv;

var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i < 3 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    }
    else {
        userInput += nodeArgs[i];
    }
} 

function commandCheck() {

    if (userCommand === "concert-this") {
        console.log(userInput);
        concertInfo();
    }

    else if (userCommand === "spotify-this-song") {
        console.log(userInput);
        spotifyInfo();
    }

    else if (userCommand === "movie-this") {

    }

    else if (userCommand === "do-what-it-says") {

    }

    else {
        console.log("ERROR: Please enter valid command");
    }
}

commandCheck();


function concertInfo() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    var moment = require("moment");
    axios.get(queryUrl).then(
        function(response) {
            data = response.data;
            
            for (i = 0; i < 3; i++) {
            console.log("----------");
            console.log("Artist: " + data[0].artist.name);
            console.log("----------");
            console.log("Venue: " + data[i].venue.name);
            console.log("----------");
            if (data[i].venue.region === "") {
                console.log("Location: " + data[i].venue.city + "," + data[i].venue.country);
            }
            else {
                console.log("Location: " + data[i].venue.city + "," + data[i].venue.region);
            }
            console.log("----------");
            console.log("Date: " + moment(data[i].datetime).format("MM DD YYYY"));
            console.log("----------");
        
        }
        }
    )
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}




function spotifyInfo() {

    var Spotify = require("node-spotify-api");

    var keys = require("./keys.js");
    
    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret  
    });

    spotify 
        .search({type: "track", query: userInput})
        .then(function(response) {
            console.log("----------");
            console.log("Artist: " + response.track.items);
        })
        .catch(function(err) {
            console.log(err);
        })
}
