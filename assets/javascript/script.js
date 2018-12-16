
var topics = ["Iron Man", "Captain America", "Thor", "Hulk", "Black Widow", "Hawkeye", "Deadpool", "Wolverine", "Spiderman", "Batman", "Superman"];



	function renderButtons () {
		$(".buttons-view").empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button>");
			newButton.addClass("topic btn btn-default");
			newButton.attr("data-name", topics[i]);
			newButton.text(topics[i]);
			$(".buttons-view").append(newButton);
		}
	};

	$("#add-topic").on("click", function (event) {
		event.preventDefault();
		var topic = $("#topic-input").val().trim();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=aflXFjFrZxxSpWBc8H65CvvhZHAJCIhJ";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

	        if (response.data.length == 0) {
	        	alert("No Gifs could be found for this topic");
	        }
			else if (topics.indexOf(topic) != -1) {
				alert("Topic has already been created");
			}
			else {
				topics.push(topic);
				renderButtons();
			}

		});
	});

	function displayGifs () {
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=aflXFjFrZxxSpWBc8H65CvvhZHAJCIhJ";

		$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);

          $(".gifs-view").empty();
          for (var i = 0; i < response.data.length; i++) {
          	var gifDiv = $("<div>");
          	gifDiv.addClass("gifDiv");
          	gifDiv.html("<p>Rating: " + response.data[i].rating.toUpperCase() + "</p>");

          	var gifImage = $("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
          	gifImage.addClass("gif");

          	var imageDiv = $("<div>");
          	imageDiv.addClass("play");
          	imageDiv.attr("data-state", "still");
          	imageDiv.attr("data-name", topic);
          	imageDiv.attr("data-still", response.data[i].images.fixed_height_still.url);
          	imageDiv.attr("data-animate",response.data[i].images.fixed_height.url)
          	
          	$(imageDiv).append(gifImage);
          	$(gifDiv).append(imageDiv);
          	$(".gifs-view").append(gifDiv);
          }

        });
	};

	function playGif () {

		if ($(this).attr("data-state") == "still") {
			$(this).html("<img src='" + $(this).attr("data-animate") + "'>");
			$(this).attr("data-state", "animate");
		}
		else {
			$(this).html("<img src='" + $(this).attr("data-still") + "'>");
			$(this).attr("data-state", "still");
		}

	};


	$(document).on("click", ".topic", displayGifs);
	$(document).on("click", ".play", playGif);


renderButtons();