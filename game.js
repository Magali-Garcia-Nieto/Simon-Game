var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  var indexOfLastAnswer = userClickedPattern.length - 1;

  // alert("it arrived here!");

  checkAnswer(indexOfLastAnswer);
});



function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level = level + 1;

  $("#level-title").text("Level " + level);

}



function playSound(name) {
  switch (name) {
    case "blue":
      var audio1 = new Audio('sounds/blue.mp3');
      audio1.play();
      break;

    case "green":
      var audio2 = new Audio('sounds/green.mp3');
      audio2.play();
      break;

    case "red":
      var audio3 = new Audio('sounds/red.mp3');
      audio3.play();
      break;

    case "yellow":
      var audio4 = new Audio('sounds/yellow.mp3');
      audio4.play();
      break;
  }
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {

    $("." + currentColour).removeClass("pressed");
  }, 100);

}


$("body").keypress(function(event) {
  if (level === 0) {
    // alert("this is working");

    nextSequence();

  }
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // alert("it was right!");


    if (userClickedPattern.length === gamePattern.length) {

      // alert("HERE! 3");
      // setTimeout(nextSequence(), 1000);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else /*(userClickedPattern[currentLevel] !== gamePattern[currentLevel])*/ {

    // alert("it was wrong! HERE 4");

    var audio5 = new Audio('sounds/wrong.mp3');

    audio5.play();

    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0,
    gamePattern = [];
}
