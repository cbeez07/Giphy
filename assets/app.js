// Get an API Key from Giphy *
// creat an array of tv Characters *
// create the html for the project. *
// code the javascript.
  // render buttons for all the strings of the array, *
  // make the forms to create buttons for the values typed in the form.*
  // when the button is clicked it will call the API and show gifs for the button that is clicked. with the rating below the gif.*
  // make the gifs still when they come in but be able to click on them to animate. another click makes them still again.*
  //




$(document).ready(function() {
  // create an array of TV Characters
  // variables:
  var tvCharacters = ['Shawn Spencer', 'Chuck Bartowski', 'Sarah Walker', 'Barney Stinson', 'Stewie Griffin', 'Sheldon Cooper', 'Michael Scott', 'Kate Beckett', 'Bones', 'Buffy Summers', 'Liz Lemon', 'Leslie Knope', 'Andy Dwyer', 'Malcolm Reynolds', 'Kaylee Frye'];
  var apiKey = '&api_key=0zIZnlZEZgjUn55wYpc4Bt33OqvwuCDx';



  // functions:
  // Render Buttons from the array/form:
  function renderButtons() {
    $('#character-buttons').empty();
    for (var i = 0; i < tvCharacters.length; i++) {
      var buttons = $('<button>');
      buttons.addClass('btn btn-success character-btn mr-1 mb-1');
      buttons.attr({'data-name': tvCharacters[i],
        type: 'button'});
      buttons.text(tvCharacters[i]);
      $('#character-buttons').append(buttons);
    }
  }

  // function to call api whenever the button is pressed.
  function displayCharacterGifs() {
    $('#characters').empty();
    // console.log('one');
    var character = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + character + apiKey + '&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      var results = response.data
      for (var i = 0; i < results.length; i++) {

        var imageURL = response.data[i].images.fixed_height_still.url;
        var imageStill = response.data[i].images.fixed_height_still.url;
        var imageAnimate = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;

        // create variables to hold the elements (img and p)
        var newDiv = $('<div>');
        var ratingP = $('<span>');
        ratingP.addClass('caption');
        ratingP.text('Rating: ' + rating);
        var charImage = $('<img>');
        charImage.attr({'src': imageURL, 'alt': 'TV Character', 'data-still': imageStill, 'data-animate': imageAnimate, 'data-state': 'still'});
        charImage.addClass('mr-2 gif');
        newDiv.addClass('item mr-1 mt-1');

        newDiv.append(charImage);
        newDiv.append(ratingP)
        $('#characters').append(newDiv);
      }
    });
  }

  // Onclick events:
  // when form is submited the val from the box is pushed to the tvCharacters array.
  // run the renderButtons funtion to add the new button to html.
  $('#add-character').on('click', function(event) {
    event.preventDefault();
    var tv = $('#character-input').val().trim();
    console.log(tv);
    if (tv.length > 0) {
      tvCharacters.push(tv);
      renderButtons();

    };
  });

  // calling the displayCharacterGifs function whenever a button with the class character-btn is clicked
  $(document).on('click', '.character-btn', displayCharacterGifs);

  // on click events to animate the gifs.
  $(document).on('click', '.gif', function(){
    // console.log(this);
    var state = $(this).attr('data-state');
    // console.log(state);
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });

  // call function so the words in the arrays are
  renderButtons();
});
