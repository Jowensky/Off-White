var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/OffWhite";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// Require all models

var PORT = process.env.PORT || 3000;

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
  