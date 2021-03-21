// 1. at start load in the first question
// repeat {
// 2. user selects question and submits the form
// 3. answer is stored
// 4. next question loads
// }
// after last question is submitted show results

// Track the question were on
var questionCount = 0;

// Timer
var time = 120;
var myInterval;

// Holds the quiz data
var questions = [
  "What is not a type in JavaScript?",
  "Which of these creates a paragraph in html?",
  "How do you save data to localStorage?",
  "How would you append a 'p' element using innerHTML to the Element 'AppendMe'?",
  "Which statement is not valid JavaScript?",
];
var questionChoices = [
  ["float", "number", "string", "bool"],
  [
    "document.createElement('p');",
    "createElement('p');",
    "innerHTML += <p></p>",
    "new Element('p')",
  ],
  [
    "local.Storage.save('key','value');",
    "localStorage.setItem('key', 'value');",
    "localDrive.save('key','value');",
    "localDrive.sendItem('key','value');",
  ],
  [
    "AppendMe.innerHTML.append('p');",
    "AppendMe.innerHTML = '<p></p>';",
    "AppendMe.innerHTML += '<p></p>';",
    "AppendMe.innerHTML.create('p');",
  ],
  ["var name;", "var str = 'java';", "var x, y, z;", "float x = 2"],
];
var userAnswers = [];
var correctAnswers = [1, 1, 2, 3, 4];
var userScore = 0;

// Score get pushed into this array untill it hit length of 3
var highScores = [];

// get the form
var form = document.getElementById("question-form");

// Load first question at start
LoadQuestion(questionCount);

var FormSubmit_Handler = function (event) {
  // TODO: Store Answer in array
  userAnswers.push(GetAnswer());

  // prevent reload after submission
  event.preventDefault();

  form.innerHTML = "";

  // questionCount tracks the question were on so incrementing
  // changes the question for when we call LoadQuestion again.
  questionCount++;

  // Logic to figure if we've answered all the questions
  if (questionCount == questions.length) {
    clearInterval(myInterval);
    ShowResults();
  } else {
    LoadQuestion(questionCount);
  }
};

/*
// find selected answer
userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
*/
function GetAnswer() {
  // store all radio button values in an array
  var answers = [
    document.getElementById("ans1").checked,
    document.getElementById("ans2").checked,
    document.getElementById("ans3").checked,
    document.getElementById("ans4").checked,
  ];
  // Find which answer was selected
  for (i = 0; i < answers.length; i++) {
    if (answers[i] == true) {
      return i + 1;
    }
  }

  // if user didn't answer return -1. -1 == skipped question.
  return -1;
}

// LoadQuestion creates DOM content in the form
function LoadQuestion(questionNumber) {
  // If we load the first question, reset nessasary vars
  if (questionNumber == 0) {
    time = 120;
    userAnswers = [];
    clearInterval(myInterval);
    myInterval = window.setInterval(CountDownTimer, 1000);
  }

  // Clear the inner html in form
  form.innerHTML = "";
  // add the first question to the innerHTML
  form.innerHTML += "<h6>" + questions[questionNumber] + "</h6>";

  // Create+add 4 radio buttons and labels to the innerHTML
  for (i = 1; i < 5; i++) {
    CreateRadioButton(i);
  }

  // Create submit button
  var buttonElement = document.createElement("BUTTON");
  buttonElement.classList.add("btn", "btn-success", "submit-btn");
  buttonElement.innerText = "Submit";
  buttonElement.setAttribute("type", "submit");
  buttonElement.setAttribute("value", "submit");

  // add button to quiz
  form.appendChild(buttonElement);
}

function CreateRadioButton(questionNumber) {
  // Creating radio button
  var inputElement = document.createElement("INPUT");
  inputElement.classList.add("btn-check");
  inputElement.setAttribute("type", "radio");
  inputElement.id = "ans" + questionNumber;
  inputElement.setAttribute("name", "answers");
  inputElement.setAttribute("value", "ans" + questionNumber);

  // Append radio button to the form
  form.appendChild(inputElement);

  var labelElement = document.createElement("LABEL");
  labelElement.classList.add("btn");
  labelElement.classList.add("btn-primary");
  labelElement.setAttribute("for", "ans" + questionNumber);
  labelElement.innerText = questionChoices[questionCount][questionNumber - 1];
  // Append label to the form
  form.appendChild(labelElement);
}

// +20 for correct answer
// -10 for skipping
// -5 for wrong answer
// Bonus Points = time left * 0.5
function ShowResults() {
  // clear the question off screen
  form.innerHTML = "";
  form.innerHTML += "<h5>Results</h5>";

  // adds results onto the end of
  for (i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == correctAnswers[i]) {
      // You got the answer correct
      form.innerHTML +=
        '<p class="correct"><strong>Question ' +
        i +
        ": </strong>" +
        userAnswers[i] +
        "    +20 pts</p>";

      // add point.
      userScore += 20;
    } else if (userAnswers[i] == -1) {
      // User skipped
      form.innerHTML +=
        '<p class="wrong"><strong>Question ' +
        i +
        ": </strong>Skipped   -10 pts</p>";
      userScore -= 10;
    } else {
      //wrong answer
      form.innerHTML +=
        '<p class="wrong"><strong>Question ' +
        i +
        ": </strong>" +
        userAnswers[i] +
        "    -5 pts</p>";
      userScore -= 5;
    }
  }
  form.innerHTML += "<p>+" + time * 0.5 + " pts for time left!";

  // Show user score
  form.innerHTML +=
    "<h5>Your Score: " + (userScore + time * 0.5) + " points</h5>";

  window.setTimeout(SaveScore(), 2500);
  window.setTimeout(ShowHighScores(), 3000);
}

// TODO:
function SaveScore() {
  // push score into array
  var name = prompt("Enter Initials!");

  // We need to make sure we dont override the localStorage value
  // Gets the priviously stored scores
  if (localStorage.getItem("highscores") !== null) {
    highScores = localStorage.getItem("highscores").split(",");
  }

  // We only want 7 highscores max
  if (highScores.length < 7) {
    // Now we push the score into the bottom
    highScores.push(name + ": " + userScore);
    localStorage.setItem("highscores", highScores);
  }

  // save score
}

function ShowHighScores() {
  // Reset question count so the questions start from the beginning
  questionCount = 0;

  // Get priviously stored
  if (localStorage.getItem("highscores") !== null) {
    highScores = localStorage.getItem("highscores").split(",");
  }

  // TODO: We need to sort the score from highest to lowest

  form.innerHTML = "";
  form.innerHTML += "<h5>Top 3 Scores</h5>";
  var orderedScoreList = document.createElement("OL");
  form.appendChild(orderedScoreList);
  for (i = 0; i < highScores.length; i++) {
    orderedScoreList.innerHTML += "<li><p>" + highScores[i] + "pts</p></li>";
  }
}

// Once the timer hits 0 they will no longer get points for completing the
// quiz fast anymore.
var timerElement = document.getElementById("timer");
function CountDownTimer() {
  if (time > 0) {
    time -= 1;
    timerElement.innerHTML = time.toString();
  }
}

// When we press submit call FormSubmit_Handler()
form.addEventListener("submit", FormSubmit_Handler);
