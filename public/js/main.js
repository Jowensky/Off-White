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
    method: "PUT",
    data: data
  }).then(function(data) {
  });
};

$(".remove").on("click", function(Event) {
  var _id = $(Event.target).data("id");

  $.ajax({
    url: "/comments/" + _id,
    method: "DELETE"
  }).then(function() {
  });
});

$(".delete").on("click", function(event) {
  var _id = $(event.target).data("id");

  $.ajax({
    url: "/delete/" + _id,
    method: "DELETE"
  }).then(function() {
  });
});