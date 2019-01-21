$(document).ready(function() {
  $("#add").on("click", function() {
    if ($("#yourauthor").val() === "" || $("#yourcomment").val() === "") {
      alert("fill out completely");
    } else {
      addcomment(event);
    }
  });

  $("#test").on("click", function() {
    $.ajax({
      url:"/scrape",
      method: "GET"
    }).then(function() {
    })
  });

  $(".remove").on("click", function() {
    removeComment(event)
  });

  $(".delete").on("click", function() {
    removeArticle(event)
  })
});

function addcomment(Event) {
  Event.preventDefault();
  var _id = $(Event.target).data("id");
  data = {
    author: $("#yourauthor")
      .val()
      .trim(),
    body: $("#yourcomment")
      .val()
      .trim()
  };

  $.ajax({
    url: "/articles/" + _id,
    method: "POST",
    data: data
  }).then(function() {
  });
}

function removeComment(Event) {
  var _id = $(Event.target).data("id");

  $.ajax({
    url: "/comments/" + _id,
    type: "DELETE"
  }).then(function() {
  });
};

function removeArticle(event) {
  var _id = $(event.target).data("id");

  $.ajax({
    url: "/article/" + _id,
    type: "DELETE",
  }).then(function() {

  });
};