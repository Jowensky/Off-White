var express = require("express");
var app = express();
var db = require("../models");

app.get("/", function(req, res) {
  db.Article.find({})
    .sort({ _id: 1 }).limit(12)
    .then(function(result) {
      res.render("index", { off: result });
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = app;
