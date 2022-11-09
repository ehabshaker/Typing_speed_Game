let allWords = [
  "Programming",
  "Destintion",
  "Destruction",
  "Hello",
  "Python",
  "Javascript",
  "Beautiful",
  "Careful",
  "Careless",
  "Excited",
  "Accountant",
  "Shakespeare",
  "Tangerine",
  "Bookcase",
  "Engineer",
  "Dictionary",
  "Firefighter",
  "January",
  "Players",
  "Good",
  "GoalKeeper",
  "Sometimes",
  "Confidence",
  "Birds",
  "Country",
  "Egypt",
  "Cairo",
  "Drive",
  "Friends",
  "Done",
];

// Setting Levels
let lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};

// All Selectors
let lvlDom = document.querySelector(".game-desc .lvl");
let timeGame = document.querySelector(".game-desc .time-game");
let startPlayBtn = document.querySelector(".start-play");
let genWord = document.querySelector(".gen-word");
let input = document.querySelector("input");
let wordsShow = document.querySelector(".words-show");
let leftTime = document.querySelector(".left-time");
let successTries = document.querySelector(".success");
let totalWordsUnm = document.querySelector(".total");
let finishGame = document.querySelector(".finish");
let levels = document.querySelectorAll(".levels .level");
let selectContainer = document.querySelector(".select-lvls");

let DefaultLvl;
let DefaultLvlTime;

levels.forEach((level) => {
  level.onclick = function () {
    selectContainer.remove();

    DefaultLvl = level.dataset.level;
    DefaultLvlTime = lvls[level.dataset.level];

    // Add Data In Dom
    lvlDom.innerHTML = `[${DefaultLvl}]`;
    timeGame.innerHTML = `[${DefaultLvlTime}]`;
    leftTime.innerHTML = DefaultLvlTime;
    totalWordsUnm.innerHTML = allWords.length;
  };
});

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startPlayBtn.onclick = function () {
  this.remove();
  input.focus();

  // Generate Word Function
  generateWord();
};

// Generate Word Function
function generateWord() {
  // Generate Number From Array
  let randomWord = allWords[Math.trunc(Math.random() * allWords.length)];

  // get index Of Word
  let wordIndex = allWords.indexOf(randomWord);

  // Remove Word From Array
  allWords.splice(wordIndex, 1);

  // Add Word In Dom
  genWord.innerHTML = randomWord;

  // Call Start Play Function
  startPlay();
}

// Start Play Function
function startPlay() {
  // Reset Timer
  leftTime.innerHTML = DefaultLvlTime;

  let count = setInterval(() => {
    leftTime.innerHTML--;

    if (leftTime.innerHTML == 0) {
      // Stop Timer
      clearInterval(count);
      // Compare Words
      if (genWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";

        // Increase Score
        successTries.innerHTML++;

        if (allWords.length > 0) {
          generateWord();
        } else {
          // Call Remove Dom Function
          removeDom();

          let div = document.createElement("div");
          div.className = "good";
          div.innerHTML = "Congratulation";
          finishGame.appendChild(div);
        }
      } else {
        // Call Remove Dom Function
        removeDom();

        let div = document.createElement("div");
        div.className = "bad";
        div.innerHTML = "Game Over";
        finishGame.appendChild(div);
      }
    }
  }, 1000);
}

function removeDom() {
  input.remove();
  genWord.remove();
}
