var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

function pressedButtonEffect(name) {
    $("#" + name).addClass("pressed");
    setTimeout(() => {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function displayHeading(currentLevel) {
    $("h1").html("Level " + currentLevel);
}

function nextSequence() {
    var randomNumber = Math.random() * 4;
    var floorNumber = Math.floor(randomNumber);
    return floorNumber;
}

function playAudio(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function establishSequence() {
    userClickedPattern = [];
    displayHeading(level);
    var randomChosenColor = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playAudio(randomChosenColor);
    displayHeading(++level);
}

$(document).keypress((event) => {
    if (!gameStart) {
        establishSequence();
        gameStart = true;
    }
})

$(".btn").on("click", (event) => {
    if (gameStart) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playAudio(userChosenColor);
        pressedButtonEffect(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                establishSequence();
            }, 500)
        }
    }
    else {
        startOver();
    }
}

function startOver() {
    playAudio("wrong");
    gamePattern = [];
    gameStart = false;
    level = 0;
    $("h1").text("Press A key to Start");
}





