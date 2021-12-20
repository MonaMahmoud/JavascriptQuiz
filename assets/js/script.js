
var questions = [
{
    question:"Which of the following is not JavaScript Data Types?",
    answerA:"Undefined",
    answerB:"Float",
    answerC:"Boolean",
    answerD:"Number",
    correctAnswer:"B"
},
{
    question:"What are the types of Pop up boxes available in JavaScript?",
    answerA:"Prompt",
    answerB:"Alert",
    answerC:"Confirm",
    answerD:"All of the above",
    correctAnswer:"D"
},{
    question:"How to write an IF statement for executing some code if 'i is NOT equal to 5'?",
    answerA:"if(i <> 5)",
    answerB:"if i <> 5",
    answerC:"if ( i != 5 )",
    answerD:"if i != 5 then",
    correctAnswer:"C"
}
]

var startBtn = document.getElementById("startBtn");
var questionText = document.getElementById("question");
var firstChoiceBtn = document.getElementById("firstChoice");
var secondChoiceBtn = document.getElementById("secondChoice");
var thirdChoiceBtn = document.getElementById("thirdChoice");
var fourthChoiceBtn = document.getElementById("fourthChoice");
var scoreBtn = document.getElementById("scoreBtn");
var scoresList = document.getElementById("scoresList");
var countDownSpan = document.getElementById("countdown");

var i=0;
var right = 0;
var wrong = 0;
var clearTime;

var timer = 120;

function decTimer(){
    countDownSpan.style.display = "block";
    countDownSpan.textContent = "Time: "+timer;
    if(timer>0){
        timer--;
    }
    else {
      //  alert("out of time");
        clearInterval(clearTime);
        endQuiz();
        //alert(right+" questions were answered right and "+wrong +" questions were answered wrong");
    }
}


var highScores = [];
//var highScores = new Array();


function renderScores(){

  // Render a new li for each todo
  for (var j = 0; j < highScores.length; j++) {
    var scoreItem = highScores[j];

    var li = document.createElement("li");
    //console.log(highScores[j].initials + highScores[j].scoreNo);
    //li.textContent = highScores[j].initials + highScores[j].scoreNo;
    li.textContent = highScores[j];
    scoresList.appendChild(li);
  }
  document.getElementById("scoresContainer").style.display = "block";
  document.getElementById("title").textContent = "High Scores!";

}

function storeScore(){

    document.getElementById("endQuizContainer").style.display = "none";
    var storedScores = JSON.parse(localStorage.getItem("highScores"));

  // If high scores were retrieved from localStorage, update the highScores array to it
  if (storedScores !== null) {
    //console.log(storedScores[0]);
    highScores = storedScores;
  }

  var score = document.getElementById("initials").value+": "+right;
    highScores.push(score);
    localStorage.setItem("highScores",JSON.stringify(highScores));

    renderScores();
}


//   else
//   {
//     highScores = [];
//     console("highscores initialized");
//   }

  // This is a helper function that will render todos to the DOM
  //renderScores();

    // var score = {
    //     initials: "",
    //     scoreNo: ""
    // };

    // score.initials = document.getElementById("initials").value;
    // score.scoreNo = right;
    //console.log(highScores);
    
    //console.log(score);
    
    //console.log(highScores);

    //var score = document.getElementById("initials").value+":"+right;
    //highScores.push(score);
    



//add event handler to the start quiz button
startBtn.addEventListener("click",startQuiz);
firstChoiceBtn.addEventListener("click",handleChoice);
secondChoiceBtn.addEventListener("click",handleChoice);
thirdChoiceBtn.addEventListener("click",handleChoice);
fourthChoiceBtn.addEventListener("click",handleChoice);
scoreBtn.addEventListener("click",storeScore);

function startQuiz(){
    startBtn.style.display = "none";
    document.getElementById("questionContainer").style.display = "block";
    writeQuestion();
    clearTime = setInterval(decTimer,1000);
}

function endQuiz(){
document.getElementById("questionContainer").style.display = "none";
clearInterval(clearTime);

document.getElementById("endQuizContainer").style.display = "block";
document.getElementById("correctAnswers").textContent = "" + right;
countDownSpan.style.display = "none";


}

function handleChoice(event){
    //user chose correct answer
    if(event.target.getAttribute("data-choice")==questions[i].correctAnswer){
        right++;
        // event.target.style.background = "pink";
        // event.target.style.color = "navy";
        if(i<questions.length-1){
            i++;
            writeQuestion();
        }
        else{
            endQuiz();
            //alert("out of questions");
        }
        //event.target.textContent = "correct";
        //alert("correct answer");
    }
    //user chose wrong answer
    else{
        //wrong++;
        if(timer>=10){
        //deduct time from timer
        timer = timer - 10;

            //add code here to jump to next question 
            i++;
            if(i<questions.length){
                writeQuestion();
            }
            else{
                endQuiz();
            }
            

        }
        else{
            timer = 0;
        }
    }
    
}

function writeQuestion(){
    questionText.textContent = questions[i].question;
    firstChoiceBtn.textContent = questions[i].answerA;
    secondChoiceBtn.textContent = questions[i].answerB;
    thirdChoiceBtn.textContent = questions[i].answerC;
    fourthChoiceBtn.textContent = questions[i].answerD;
    firstChoiceBtn.style.background = "darkgreen";
    secondChoiceBtn.style.background = "darkgreen";
    thirdChoiceBtn.style.background = "darkgreen";
    fourthChoiceBtn.style.background = "darkgreen";
    firstChoiceBtn.style.color = "khaki";
    secondChoiceBtn.style.color = "khaki";
    thirdChoiceBtn.style.color = "khaki";
    fourthChoiceBtn.style.color = "khaki";
}