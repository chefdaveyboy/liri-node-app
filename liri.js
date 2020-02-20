require("dotenv").config();



var axios = require("axios");

var userCommand = process.argv[2];

var nodeArgs = process.argv;

var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    }
    else {
        userInput += nodeArgs[i];
    }
} 

function commandCheck() {

    if (userCommand === "concert-this") {
        
        concertInfo();
    }

    else if (userCommand === "spotify-this-song") {
        
        spotifyInfo();
    }

    else if (userCommand === "movie-this") {
        
        movieInfo();
    }

    else if (userCommand === "do-what-it-says") {
        randomizer()
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
            console.log("");
            console.log("Venue: " + data[i].venue.name);
            console.log("");
            if (data[i].venue.region === "") {
                console.log("Location: " + data[i].venue.city + "," + data[i].venue.country);
            }
            else {
                console.log("Location: " + data[i].venue.city + "," + data[i].venue.region);
            }
            console.log("");
            console.log("Date: " + moment(data[i].datetime).format("MM DD YYYY"));
            console.log("----------");
        
        }
        }
    )
    .catch(function(error) {
        if (error.response) {
          
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
         
          console.log(error.request);
        } else {
          
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

    if (userInput === "") {
        userInput = "The Sign";
    }

    spotify 
        .search({type: "track", query: userInput, limit: 1})
        .then(function(response) {
            
            for(i = 0; i < response.tracks.items.length; i++) {
                // console.log(response.tracks.items[i]);
                console.log("----------");
                console.log("Song Title: " + response.tracks.items[i].name);
                for(j = 0; j < response.tracks.items[i].artists.length; j++) {
                    console.log("Artist: " + response.tracks.items[i].artists[j].name); 
                }
                
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log("Song Link: " + response.tracks.items[i].external_urls.spotify);
                console.log("----------");
            }
            })
        .catch(function(err) {
            console.log(err);
        })
}

function movieInfo() {
    if (userInput === "") {
            userInput = "Mr Nobody";
        }

    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryURL);
    axios.get(queryURL)
    .then(
        function(response) {
            console.log("----------");
            console.log("Title: " + response.data.Title);
            console.log("");
            console.log("Year: " + response.data.Year);
            console.log("");
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[response.data.Ratings.findIndex(index=>index.Source === "Rotten Tomatoes")].Value);
            console.log("");
            console.log("Country: " + response.data.Country);
            console.log("");
            console.log("Language: " + response.data.Language);
            console.log("");
            console.log("Plot: " + response.data.Plot);
            console.log("");
            console.log("Actors: " + response.data.Actors);
            console.log("----------");
    })
    .catch(function(error) {
        if (error.response) {
         
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          
          console.log(error.request);
        } else {
          
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

}

function randomizer() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        

        var randomArray = data.split(",");

        
        //unable to get it to read random.txt unless formatted perfectly(without spaces between the command and userInput).
        for (i = 0; i < randomArray.length; i++) {
            userCommand = randomArray[0];
            userInput = randomArray[1];
            return commandCheck();
        }
    })
}