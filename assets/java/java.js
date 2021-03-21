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
var time = 100;
var myInterval = window.setInterval(CountDownTimer, 1000);

// Holds the quiz data
var questions = ["how?", "what?", "where?", "when?", "why?"];
var questionChoices = [
  ["how1", "how2", "how3", "how4"],
  ["what1", "what2", "what3", "what4"],
  ["where1", "where2", "where3", "where4"],
  ["when1", "when2", "when3", "when4"],
  ["why1", "why2", "why3", "why4"],
];
var userAnswers = [];
var correctAnswers = [1, 1, 2, 3, 4];
var userScore = 0;

// get the form
var form = document.getElementById("question-form");

// Load first question at start
LoadQuestion(questionCount);

var FormSubmit_Handler = function (event) {
  // TODO: Store Answer in array
  userAnswers.push(GetAnswer());
  console.log("UserAnswers: " + userAnswers);

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
  console.log("LOADING QUESTION: " + questionNumber);
  // Clear the inner html form
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
        "    + 20 pts</p>";

      // add point.
      userScore += 20;
    } else {
      //wrong answer
      form.innerHTML +=
        '<p class="wrong"><strong>Question ' +
        i +
        ": </strong>" +
        userAnswers[i] +
        "    - 5 pts</p>";
      userScore -= 5;
    }
  }
  form.innerHTML += "<p>+" + time * 0.5 + " pts for time left!";

  // Show user score
  form.innerHTML +=
    "<h5>Your Score: " + (userScore + time * 0.5) + " points</h5>";

  // Create submit button
  var buttonElement = document.createElement("BUTTON");
  buttonElement.classList.add("btn", "btn-success", "submit-btn");
  buttonElement.innerText = "Submit";
  buttonElement.setAttribute("type", "submit");
  buttonElement.setAttribute("value", "submit");

  // add button to quiz
  form.appendChild(buttonElement);
}

function SaveScore() {}

var timerElement = document.getElementById("timer");
function CountDownTimer() {
  time -= 1;
  timerElement.innerHTML = time.toString();
}

// When we press submit call FormSubmit_Handler()
form.addEventListener("submit", FormSubmit_Handler);
