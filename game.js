
var buttonColours = ["red","blue", "green","yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var start = false;

function nextSequence(){
    userClickedPattern = [];
    count++;
    $("#level-title").html("Level " + count);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour)
    
    
}
function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
      }, 100);
}

$(document).on('keypress',function(){
    if(!start){
        $("h1").text("Level " + count);
        nextSequence();
        start = true;
    }

});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succsess");
         
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }
    
}
function startOver(){
    count = 0;
    start = false;
    gamePattern = [];

}


