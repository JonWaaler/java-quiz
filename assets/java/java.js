// 1. at start load in the first question
// repeat {
// 2. user selects question and submits the form
// 3. answer is stored
// 4. next question loads
// }
// after last question is submitted show results

// Track the question were on
var questionCount = 0;

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

// get the form
var form = document.getElementById("question-form");

// Load first question at start
LoadQuestion(questionCount);

var FormSubmit_Handler = function (event) {
  // TODO: Store Answer in array

  // prevent reload after submission
  event.preventDefault();

  form.innerHTML = "";

  // questionCount tracks the question were on so incrementing
  // changes the question for when we call LoadQuestion again.
  questionCount++;

  // Logic to figure if we've answered all the questions
  if (questionCount == questions.length) {
    ShowResults();
  } else {
    LoadQuestion(questionCount);
  }
};

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

  // TODO: show user results
}

// When we press submit call FormSubmit_Handler()
form.addEventListener("submit", FormSubmit_Handler);
