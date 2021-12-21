

var startBtn = document.getElementById("startBtn");
var questionText = document.getElementById("question");
var firstChoiceBtn = document.getElementById("firstChoice");
var secondChoiceBtn = document.getElementById("secondChoice");
var thirdChoiceBtn = document.getElementById("thirdChoice");
var fourthChoiceBtn = document.getElementById("fourthChoice");
var scoreBtn = document.getElementById("scoreBtn");
var scoresList = document.getElementById("scoresList");
var countDownSpan = document.getElementById("countdown");
var scoresContainer = document.getElementById("scoresContainer");
var currentTitle = document.getElementById("title");
var endQuizContainer = document.getElementById("endQuizContainer");
var questionContainer = document.getElementById("questionContainer");

var i = 0;
var right = 0;
var wrong = 0;
var clearTime;
var timer = 120;
var highScores = [];

//add event handler to the start quiz button
startBtn.addEventListener("click", startQuiz);
//add same event handler to answer buttons to check whether answer is correct or wrong
firstChoiceBtn.addEventListener("click", handleChoice);
secondChoiceBtn.addEventListener("click", handleChoice);
thirdChoiceBtn.addEventListener("click", handleChoice);
fourthChoiceBtn.addEventListener("click", handleChoice);
//add event hander to store score button
scoreBtn.addEventListener("click", storeScore);

//function called every one second to decrement the timer
function decTimer() {
  //change display property of the timer to be visible
  countDownSpan.style.display = "block";
  //update timer text to show number of seconds remaining
  countDownSpan.textContent = "Time: " + timer;
  //there is still time: continue quiz
  if (timer > 0) {
    timer--;
  }
  //out of time: end the quiz
  else {
    //stop the interval function
    clearInterval(clearTime);
    //end the quiz and go to next screen
    endQuiz();
  }
}

//function to render previously stored high scores into the page
function renderScores() {
  // Render a new li for each high score
  for (var j = 0; j < highScores.length; j++) {
    //create a list item to display current high score
    var li = document.createElement("li");
    //li.textContent = highScores[j].initials + highScores[j].scoreNo;

    //set text of list item to the current high score value
    li.textContent = highScores[j];
    //append the list item to the scores list on page
    scoresList.appendChild(li);
  }
  //change display property of scores container to be visible
  scoresContainer.style.display = "block";
  //change current title of page
  currentTitle.textContent = "High Scores!";
}

//function to store score into local storage
function storeScore() {
  //change display property of initials container to be invisible
  endQuizContainer.style.display = "none";
  //check if there scores previously stored in local storage
  var storedScores = JSON.parse(localStorage.getItem("highScores"));

  // If scores were retrieved from localStorage, update the highScores array to it
  if (storedScores !== null) {
    highScores = storedScores;
  }
  //get the value for current score that needs to be stored
  var score = document.getElementById("initials").value + ": " + right;
  //add the latest score value to the scores array
  highScores.push(score);
  //store the whole scores array into local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));
  //render all the scores to be displayed on the page
  renderScores();
}
//   else
//   {
//     highScores = [];
//   }

// var score = {
//     initials: "",
//     scoreNo: ""
// };

// score.initials = document.getElementById("initials").value;
// score.scoreNo = right;

//function to start the quiz
function startQuiz() {
  //change styling of quiz start button to be invisible
  startBtn.style.display = "none";
  //change styling of questions container to be visible
  questionContainer.style.display = "block";
  //write the first quiz question
  writeQuestion();
  //set the timer interval to update timer every 1 second
  clearTime = setInterval(decTimer, 1000);
  //change the current title of the page
  currentTitle.textContent = "Clock is ticking!";
}

//function to end the quiz when out of timer or questions ended
function endQuiz() {
  //change styling of questions container to be invisible
  questionContainer.style.display = "none";
  //stop calling the timer function and clear the timer
  clearInterval(clearTime);
  //change styling of current score to be visible to show user his/her score
  endQuizContainer.style.display = "block";
  endQuizContainer.style.display = "grid";
  endQuizContainer.style.gap = "20px";
  endQuizContainer.style.gridTemplateColumns = "1fr 1fr";
  //endQuizContainer.style.minWidth = "300px";
  //display the number of correct answers to the user
  document.getElementById("correctAnswers").textContent = "" + right;
  //change styling of the timer to be invisible
  countDownSpan.style.display = "none";
  //change the current title of the page
  currentTitle.textContent = "Save Your Score!";
}

//function to check whether user chose a correct or wrong answer
function handleChoice(event) {
  //user chose correct answer
  if (event.target.getAttribute("data-choice") == questions[i].correctAnswer) {
      //increment number of correct answers
    right++;
    //if there are still more questions in the quiz load them
    if (i < questions.length - 1) {
      i++;
      writeQuestion();
    } 
    //this is the last question so end the quiz
    else {
      endQuiz();
    }
  }
  //user chose wrong answer
  else {
      //deduct time from timer if it 10 seconds or more remaining
    if (timer >= 10) {
      //deduct 10 seconds from the timer 
      timer = timer - 10;
    } else {
        //timer has less than 10 seconds left so set timer to zero
      timer = 0;
    }
    //go on to the next question
    i++;
    //there are still questions in the quiz so write the next question
      if (i < questions.length) {
        writeQuestion();
      } 
      //this is the last question so end the quiz
      else {
        endQuiz();
      }
  }
}

//function to write the current question to the HTML page
function writeQuestion() {
    //write the text of the question
  questionText.textContent = questions[i].question;
  //write the first choice
  firstChoiceBtn.textContent = questions[i].answerA;
  //write the second choice
  secondChoiceBtn.textContent = questions[i].answerB;
  //write the third choice
  thirdChoiceBtn.textContent = questions[i].answerC;
  //write the fourth choice
  fourthChoiceBtn.textContent = questions[i].answerD;
  //change styling of the answer buttons
  firstChoiceBtn.style.background = "darkgreen";
  secondChoiceBtn.style.background = "darkgreen";
  thirdChoiceBtn.style.background = "darkgreen";
  fourthChoiceBtn.style.background = "darkgreen";
  firstChoiceBtn.style.color = "khaki";
  secondChoiceBtn.style.color = "khaki";
  thirdChoiceBtn.style.color = "khaki";
  fourthChoiceBtn.style.color = "khaki";
}
