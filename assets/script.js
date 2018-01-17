
var gifsArray = ["New England Patriots", "Tom Brady", "Coach Belichick", "Rob Gronkowski", "The Gronk", "Boston Bruins", "David Pastrnak", "Boston Red Sox"];

function renderButtons() {

  $("#gifs-view").empty();

  for (var i = 0; i < gifsArray.length; i++) {

    var a = $("<button>");
    a.addClass("gif");
    a.addClass("button")
    a.attr("data-name", gifsArray[i]);
    a.text(gifsArray[i]);
    $("#gifs-view").append(a);
  }
}

$(".gif-submit").on("click", function (event) {

  event.preventDefault();

  var newGif = $("#gifs-input").val().trim();
  gifsArray.push(newGif);

  renderButtons();
  buttonGifSearch();
  $("#gifs-input").val("");
});

function buttonGifSearch() {
  var buttonClick = $("button").on("click", function (event) {

    var searchItem = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        $("#gifs-images").empty();
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "") {
            var gifDiv = $("<div class='item' id='giphy-div'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var giphyImage = $("<img>");

            giphyImage.attr("src", results[i].images.original_still.url);
            giphyImage.attr("data-still", results[i].images.original_still.url);
            giphyImage.attr("data-animate", results[i].images.original.url);
            giphyImage.attr("class", "gif");
            giphyImage.attr("data-state", "still");
            giphyImage.attr("width", "500px");
            giphyImage.attr("height", "400px");

            gifDiv.append(p);
            gifDiv.append(giphyImage);

            $("#gifs-images").append(gifDiv);
          }
        }
        gifAnimate();
      });
  });
}

function gifAnimate() {
  var clickGif = $(".gif").on("click", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}

renderButtons();
buttonGifSearch();