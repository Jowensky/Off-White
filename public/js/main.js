$(document).ready(function() {
    
  $("#add").on("click", function(Event) {
    Event.preventDefault();
    var _id = $(Event.target).data("id")
    data = {
      author: $("#yourauthor").val().trim(),
      body: $("#yourcomment").val().trim()
    }

    $.ajax({
      url:"/articles/" + _id,
      method:"POST",
      data: data
    }).then(function(data){
      console.log(data)
    })
  });

  $(".remove").on("click", function(Event) {
    var _id = $(Event.target).data("id")
    var article = $(Event.target).data("article")

    $.ajax({
      url:"/articles/comments/" + _id,
      method: "POST"
    }).then(function() {
      console.log("done")
    })
  })

  $(".delete").on("click", function(event) {
    var _id = $(event.target).data("id")

    $.ajax({
      url:"/article/delete/" + _id,
      method: "POST"
    }).then(function() {
      console.log(finished)
    })
  })
});
