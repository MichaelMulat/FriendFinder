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

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});