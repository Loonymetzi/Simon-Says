var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var isFirstClick=0;
var level=0;

if(isFirstClick==0)
{
    $(document).keypress(function()
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        isFirstClick=1;
    });
}

$(".btn").click( function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomVar=Math.random()*4;
    randomVar=Math.floor(randomVar);
    var randomChosenColor=buttonColors[randomVar];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("Right");

        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else
    {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver()
{
     gamePattern=[];
     userClickedPattern=[];
     isFirstClick=0;
     level=0;
}

function playSound(name)
{
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor)
{
    var pressedBtn=$("#" + currentColor);
    pressedBtn.addClass("pressed");
    setTimeout(function(){
        pressedBtn.removeClass("pressed");
    },100);
}
