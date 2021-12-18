
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

var i=0;
var right = 0;
var wrong = 0;
var clearTime;

var timer = 120;

function decTimer(){
    document.getElementById("countdown").textContent = "Time: "+timer;
    if(timer>0){
        timer--;
    }
    else {
      //  alert("out of time");
        clearInterval(clearTime);
        alert(right+" questions were answered right and "+wrong +" questions were answered wrong");
    }
}


//add event handler to the start quiz button
startBtn.addEventListener("click",startQuiz);
firstChoiceBtn.addEventListener("click",handleChoice);
secondChoiceBtn.addEventListener("click",handleChoice);
thirdChoiceBtn.addEventListener("click",handleChoice);
fourthChoiceBtn.addEventListener("click",handleChoice);

function startQuiz(){
    startBtn.style.display = "none";
    document.getElementById("questionContainer").style.display = "block";
    writeQuestion();
    clearTime = setInterval(decTimer,1000);
}

function endQuiz(){
document.getElementById("questionContainer").style.display = "none";
clearInterval(clearTime);
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