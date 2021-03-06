/*
 * G I F T A S T I C
 * Using GIPHY'S API
 * by Jordan Boggs
 * 2017 DU Coding Boot Camp
 */
var topics = ["jean-luc picard","worf","geordie laforge", "william riker",
              "captain kirk","spock","ben sisko","darth vader",
              "luke skywalker","chewbacca","han solo","princess leia",
              "admiral adama","lieutenant starbuck","gaius baltar"];

var buttonPresses = 0;

// This function draws the array buttons in id #buttons
var renderButtons = function() {
  $("#buttons").empty();

  topics.forEach(element => {
    $("#buttons").append(`<button class="search-item" 
                           data-animal="${element}">${element}</button>`);
  });
};

$(document).ready(renderButtons());

// This function handles events where a new animal is added
$(document).on("click", "#add-animal", function(event) {
  event.preventDefault();
  let animal = $("#animal-input").val().trim();

  topics.push(animal);

  renderButtons();
});

// This function calls the GIPHY API to display animal gifs
$(document).on("click", ".search-item", function() {
  // Hide instructions if needed
  if (buttonPresses < 1) {
    $('#images').text("");
  }

  const animal = $(this).attr("data-animal");

  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}
                    &api_key=xglemIPCq6dg9YlSR2vXBBkXTxbgyqUg&limit=10`;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    const results = response.data;

    for (let i = 0; i < results.length; i++) {
      $("#images").prepend(`
        <div class="result-item">
          <p>Rating: ${results[i].rating.toUpperCase()}</p>
          <img src="${results[i].images.fixed_height_still.url}"
               data-still="${results[i].images.fixed_height_still.url}"
               data-animate="${results[i].images.fixed_height.url}"
               data-state="still" class="gif">
        </div>
      `);
    }
  });

  buttonPresses++;
});

$(document).on("click", ".gif", function() {
  let state = $(this).attr('data-state');

  if (state === 'still') {
    let newSrc = $(this).attr('data-animate');
    $(this).attr('src', newSrc);
    $(this).attr('data-state', 'animate');
  }
  else {
    let newSrc = $(this).attr('data-still');
    $(this).attr('src', newSrc);
    $(this).attr('data-state', 'still');
  }
});
