var express = require("express");
var app = express();
var db = require("../models");

app.get("/", function(req, res) {
  db.Article.find({})
    .sort({ _id: 1 })
    .limit(12)
    .then(function(result) {
      console.log(`---------------------------------RESULT`)
      res.render("index", { off: result });
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function(data) {
      res.render("comments", { article: data });
    }).catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Comment.create(req.body).then(function(result) {

    return db.Article.findOneAndUpdate({_id: req.params.id }, {$push:{ comments: result._id }}, { new: true }) 
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      console.log("finished")
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });
});

app.post("/articles/comments/:id", function(req, res) {
  db.Comment.findOneAndDelete({ _id: req.params.id})
  .then(function(data) {
    console.log(`Removed: ${data}`)
  }).catch(function(err) {
    res.json(err)
  })
});

app.post("/article/delete/:id", function(req, res) {
  db.Article.findOneAndDelete({ _id: req.params.id})
  .then(function(data) {
    console.log(`Removed: ${data}`)
  }).catch(function(err) {
    res.json(err)
  })
});

module.exports = app;