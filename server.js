var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect(
  "mongodb://localhost/OffWhite",
  { useNewUrlParser: true }
);


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
var xphb = require('express-handlebars')
app.engine('handlebars', xphb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var route = require('./controllers/route.js');
var scrape = require('./controllers/scrape.js')
app.use(route);
app.use(scrape);


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
  