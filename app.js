let programming_languages = [
  "PYTHON",
  "JAVASCRIPT",
  "JAVA",
  "CSHARP",
  "C",
  "CPLUS",
  "GO",
  "R",
  "SWIFT",
  "PHP",
];

let keyboard = document.getElementById("keyboard");

let chance = 6;
let picSatatus = 0;
let answer = "";
let wordSatus = null;
let guessed_answer = [];

// button generate
function btnDiv() {
  keyboard.innerHTML = "";
  let keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
    keyboard.innerHTML += `<button class="btn btn-outline-secondary m-2" onclick='checkAnswer("${letter}")' id="${letter}">${letter}</button>`;
  });
}

// answer generate
function generate_answer() {
  answer =
    programming_languages[
      Math.floor(Math.random() * programming_languages.length)
    ];
  console.log(answer);
}

// answer_field function
function show_answerField() {
  wordSatus = answer
    .split("")
    .map((letter) => (guessed_answer.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  document.getElementById("answer_field").innerHTML = wordSatus;
}

// check answer
function checkAnswer(letter) {
  guessed_answer.indexOf(letter) === -1 ? guessed_answer.push(letter) : null;
  document.getElementById(letter).setAttribute("disabled", true);

  if (answer.indexOf(letter) >= 0) {
    show_answerField();
    setTimeout(checkWin, 200);
  } else if (answer.indexOf(letter) === -1) {
    chance--;
    picSatatus++;
    updateChance();
    checkHangMan();
    setTimeout(checkLost, 300);
  }
}

// show chance
function updateChance() {
  document.getElementById("chance").innerHTML = chance;
}

// lost or win start
function checkWin() {
  if (wordSatus === answer) {
    Swal.fire({
      title: "Congratulations",
      text: "You won the game",
      imageUrl: "./images/Congratulations.gif",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => {
      restart();
    });
  }
}
function checkLost() {
  if (chance === 0) {
    Swal.fire({
      title: "You lost the game",
      text: "Answer is " + answer,
      imageUrl: "./images/lost.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Play Again",
    }).then((_) => {
      restart();
    });
  }
}
// lost or win end

function checkHangMan() {
  document.getElementById("hangMan").src = `./images/${picSatatus}.jpg`;
}
// restart game
function restart() {
  chance = 6;
  answer = "";
  wordSatus = null;
  guessed_answer = [];
  picSatatus = 0;
  document.getElementById("hangMan").src = `./images/0.jpg`;
  generate_answer();
  show_answerField();
  updateChance();
  btnDiv();
}

generate_answer();
updateChance();
show_answerField();
btnDiv();
