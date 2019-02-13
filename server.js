// Dependencies
var express = require("express");
var path = require("path")

var friendsData = require("./app/data/friends")


// Setup Express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import html Routes
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// app.get("/", function(req, res){
//     res.sendFile(path.join(__dirname, "./app/public/home.html"))
// })

// app.get("/survey", function (req, res) {
//     res.sendFile(path.join(__dirname, "./app/public/survey.html"))
// })

// app.get("/api/friends", function (req, res) {
//     res.json(friendsData)
// })

app.post("/api/friends", function(req, res){
    
    // get request from the form
    var newFriend = req.body;

    //create a variable for the incoming score
    var newFriendsScores = newFriend.scores;

    var bestFriend =  {};
    var smallestDiff = 40; //This is the max difference a anyone can get in the survey
    

    // Compare the Scores vallue with all the scores in the friends list
    for(i = 0; i < friendsData.length; i++){
        
        var scoreDifference = 0;
        var currentFriend = friendsData[i];
        for(j = 0; j < currentFriend.scores.length; j++){
            scoreDifference += Math.abs(parseInt(currentFriend.scores[j]) - parseInt(newFriendsScores[j]));
        }

        if(scoreDifference < smallestDiff){
            bestFriend = currentFriend;
        }

        console.log(currentFriend.name, scoreDifference);
        
    }

    console.log("your BFF is ", bestFriend);

    friendsData.push(newFriend);

    res.json(bestFriend);
})



app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});