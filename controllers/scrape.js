var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
var express = require("express");
var app = express();

app.get("/scrape", function(req, res) {
  axios
    .get("https://www.off---white.com/en/US/men/t/seasons/ss2019")
    .then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.link = $(this)
          .children("a")
          .attr("href");
        result.image = $(this)
          .children("a")
          .children("figure")
          .children("img")
          .attr("src");
        result.name = $(this)
          .children("a")
          .children("figure")
          .children("figcaption")
          .children(".brand-name")
          .text();
        result.category = $(this)
          .children("a")
          .children("figure")
          .children("figcaption")
          .children(".category-and-season")
          .children(".category")
          .text();
        result.price = $(this)
          .children("a")
          .children("figure")
          .children("figcaption")
          .children(".price")
          .children("span")
          .children("strong")
          .text();
        
          // dublicate
        db.Article.find({}, function(err, data) {
          for (var fd in data) {
            for (var fu in result) {
              //if link matches
              if (data[fd].link === result[fu].link) {
                // console.log("this");
                //delete the duplicate from the array
                result.splice(fu, 1);
                console.log(result)
                insert(result)
              } else {
                insert(result)
              }
            }
          }
        });

function insert(result) {
  db.Article.create(result)
  .then(function() {})
  .catch(function(err) {
    return res.json(err);
  });
}


      });
    });
  res.redirect("/");
});

module.exports = app;
