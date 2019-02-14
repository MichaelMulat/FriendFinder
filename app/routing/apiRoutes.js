var friendsData = require("../data/friends")

module.exports = function(app){
    app.get("/api/friends", function (req, res) {
        res.json(friendsData)
    })

    app.post("/api/friends", function (req, res) {

        // get request from the form
        var newFriend = req.body;

        //create a variable for the incoming score
        var newFriendsScores = newFriend.scores;

        var bestFriend = {};
        var smallestDiff = 40; //This is the max difference a anyone can get in the survey


        // Compare the Scores vallue with all the scores in the friends list
        for (i = 0; i < friendsData.length; i++) {

            var scoreDifference = 0;
            
            var currentFriend = friendsData[i];
            
            for (j = 0; j < currentFriend.scores.length; j++) {
                
                scoreDifference += Math.abs(parseInt(currentFriend.scores[j]) - parseInt(newFriendsScores[j]));
            }

            if (scoreDifference < smallestDiff) {
                bestFriend = currentFriend;
                smallestD0ff = scoreDifference;
            }

            console.log(currentFriend.name, scoreDifference);

        }

        console.log("your BFF is ", bestFriend);

        friendsData.push(newFriend);

        res.json(bestFriend);
    });
};