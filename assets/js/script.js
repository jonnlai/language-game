// An array of different animal names in different languages
const animals = [
  ["dog", "koira", "perro"],
  ["cat", "kissa", "gato"],
  ["bird", "lintu", "pajaro"],
  ["bear", "karhu", "oso"],
  ["wolf", "susi", "lobo"],
  ["snake", "käärme", "serpiente"],
  ["horse", "hevonen", "caballo"],
  ["sheep", "lammas", "oveja"],
];

/**
 * Create a grid for the game when Play button is clicked
 * How to use a for loop to create a grid was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 */

function loadGame() {
  document.getElementById("play-button").style.display = "none";
  document.getElementById("selection-area").style.display = "none";
  document.getElementById("info-area").style.display = "none";

  let answersArea = document.getElementById("answers-area");
  let answerColumns = 3;
  let answerRows = 8;
  for (let row = 0; row < answerRows; row++) {
    for (let col = 0; col < answerColumns; col++) {
      let square = document.createElement("div");
      square.id = col.toString() + "-" + row.toString();
      answersArea.append(square);
    }
  }

  let optionsArea = document.getElementById("options-area");
  let optionRows = 6;
  for (let optionRow = 0; optionRow < optionRows; optionRow++) {
    let option = document.createElement("div");
    option.id = "option-" + optionRow.toString();
    // How to make an element draggable was taken from Darwin Tech JavaScript Drag and Drop Youtube tutorial: https://www.youtube.com/watch?v=_G8G1OrEOrI
    option.draggable = "true";
    option.className = "draggable";
    optionsArea.append(option);
  }
  selectGame();
}

/**
 * Display the selected game based on "mode" and "theme" values
 */
function selectGame() {
  let mode = document.getElementById("mode").value;
  let theme = document.getElementById("theme").value;
  if (mode === "eng-to-fin" && theme === "animals") {
    displayEngFinAnimals();
  } else if (mode === "fin-to-eng" && theme === "animals") {
    displayFinEngAnimals();
  }
}

/**
 * Allow the user to drag and drop the option next to the correct word
 * How to use drag and drop event listeners was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 * and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event
 * and Darwin Tech JavaScript Drag and Drop Youtube tutorial: https://www.youtube.com/watch?v=_G8G1OrEOrI
 */
function playGame() {
  // Add submit button
  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.id = "submit-answer";
  submitBtn.addEventListener("click", checkAnswer);
  document.getElementById("buttons").append(submitBtn);

  let selectedOption;
  // How to convert NodeList to Array taken from https://www.geeksforgeeks.org/fastest-way-to-convert-javascript-nodelist-to-array/
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  let dropZone = Array.from(document.querySelectorAll("[id^='1-']"));
  for (let x in dropZone) {
    // Add "drop-zone" class to all the dropZone div elements to make it easier to style them
    dropZone[x].classList.add("drop-zone");
    dropZone[x].addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    dropZone[x].addEventListener("drop", function (event) {
      event.preventDefault();
      if (event.target.hasChildNodes()) {
        return;
      } else {
        event.target.append(selectedOption);
      }
    });
  }

  let optionWords = Array.from(document.querySelectorAll("[id^='option-']"));
  for (let x in optionWords) {
    optionWords[x].addEventListener("dragstart", function () {
      selectedOption = this;
    });
  }

  let optionsArea = document.getElementById("options-area");
  optionsArea.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  optionsArea.addEventListener("drop", function () {
    optionsArea.append(selectedOption);
  });
}

/**
 * Display English to Finnish animal names game
 */
function displayEngFinAnimals() {
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  //Select all the divs that have an id that starts with "0-"
  let gameWords = document.querySelectorAll("[id^='0-'");
  let animalNames = animals;
  //Select all the divs that have an id that starts with "option-"
  let optionWords = document.querySelectorAll("[id^='option-'");
  // Add the English words in the game area
  let x = 0;
  for (let y in gameWords) {
    gameWords[y].textContent = animalNames[x][0];
    if (x < 7) {
      x += 1;
    }
  }

  // Add the translated Finnish words in the options area
  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  b = 0;
  while (b < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      b += 1;
    }
  }

  // Create an array of 6 random animal names in Finnish
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][1]);
  }

  // Add the animal names to answer options area
  let c = 0;
  for (let a in optionWords) {
    optionWords[a].textContent = translatedNames[c];
    if (c < 5) {
      c += 1;
    }
  }

  playGame();
}

/**
 * Display Finnish to English animal names game
 */
function displayFinEngAnimals() {
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  //Select all the divs that have an id that starts with "0-"
  let gameWords = document.querySelectorAll("[id^='0-'");
  let animalNames = animals;
  //Select all the divs that have an id that starts with "option-"
  let optionWords = document.querySelectorAll("[id^='option-'");
  // Add the Finnish words in the game area
  let x = 0;
  for (let y in gameWords) {
    gameWords[y].textContent = animalNames[x][1];
    if (x < 7) {
      x += 1;
    }
  }

  // Add the translated English words in the options area
  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  b = 0;
  while (b < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      b += 1;
    }
  }

  // Create an array of 6 random animal names in English
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][0]);
  }

  // Add the animal names to answer options area
  let c = 0;
  for (let a in optionWords) {
    optionWords[a].textContent = translatedNames[c];
    if (c < 5) {
      c += 1;
    }
  }

  playGame();
}

/**
 * Function to check the answer and replace submit button with play again button
 */
function checkAnswer() {
  // Remove the submit button after it has been clicked
  document.getElementById("submit-answer").style.display = "none";
  // Stop the draggable elements being draggable
  let draggables = document.getElementsByClassName("draggable");
  for (let a in draggables) {
    draggables[a].draggable = false;
  }
  // Create "Play Again" button
  let againBtn = document.createElement("button");
  againBtn.innerText = "Play Again";
  againBtn.id = "play-again";
  againBtn.addEventListener("click", playAgain);
  document.getElementById("buttons").append(againBtn);

  //Check Answer
  let answerSquares = Array.from(document.querySelectorAll("[id^='1-']"));
  let answers = [];
  let answerIds = [];
  // Check which answer squares have child node i.e. draggable answers and those to the answers array
  for (let square in answerSquares) {
    if (answerSquares[square].hasChildNodes()) {
      answers.push(answerSquares[square]);
    }
  }
  // Create an array of ids of the divs that hold an answer
  for (let answer in answers) {
    answerIds += answers[answer].id + " ";
  }
  // Correct and Incorrect icons
  let correctIcon = '<i class="fa-solid fa-check"></i>';
  let incorrectIcon = '<i class="fa-solid fa-xmark"></i>';
  // Count correct and incorrect answers
  let correctCount = 0;
  let incorrectCount = 0;
  let correctAnswers = document.createElement("span");
  let incorrectAnswers = document.createElement("span");

  // Check which game the player is playing by checking the inner text of the first game square (0-0)
  // Assign the value 1 to X if the first word is in English and 0 if the first word is in Finnish
  let firstGameWord = document.getElementById("0-0").innerText;
  let x;
  if (firstGameWord === animals[0][0]) {
    x = 1;
  } else if (firstGameWord === animals[0][1]) {
    x = 0;
  }
  // Check if an ID is in the answerIds array and if so create an answerSquare variable and check it's inner text
  if (answerIds.includes("1-0")) {
    let answerSquareOne = document
      .getElementById("1-0")
      .querySelector("div").innerText;
    if (answerSquareOne === animals[0][x]) {
      document.getElementById("1-0").style.backgroundColor = "lightgreen";
      document.getElementById("2-0").style.backgroundColor = "lightgreen";
      document.getElementById("2-0").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-0").style.backgroundColor = "#ff2800";
      document.getElementById("2-0").style.backgroundColor = "#ff2800";
      document.getElementById("2-0").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-1")) {
    let answerSquareTwo = document
      .getElementById("1-1")
      .querySelector("div").innerText;
    if (answerSquareTwo === animals[1][x]) {
      document.getElementById("1-1").style.backgroundColor = "lightgreen";
      document.getElementById("2-1").style.backgroundColor = "lightgreen";
      document.getElementById("2-1").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-1").style.backgroundColor = "#ff2800";
      document.getElementById("2-1").style.backgroundColor = "#ff2800";
      document.getElementById("2-1").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-2")) {
    let answerSquareThree = document
      .getElementById("1-2")
      .querySelector("div").innerText;
    if (answerSquareThree === animals[2][x]) {
      document.getElementById("1-2").style.backgroundColor = "lightgreen";
      document.getElementById("2-2").style.backgroundColor = "lightgreen";
      document.getElementById("2-2").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-2").style.backgroundColor = "#ff2800";
      document.getElementById("2-2").style.backgroundColor = "#ff2800";
      document.getElementById("2-2").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-3")) {
    let answerSquareFour = document
      .getElementById("1-3")
      .querySelector("div").innerText;
    if (answerSquareFour === animals[3][x]) {
      document.getElementById("1-3").style.backgroundColor = "lightgreen";
      document.getElementById("2-3").style.backgroundColor = "lightgreen";
      document.getElementById("2-3").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-3").style.backgroundColor = "#ff2800";
      document.getElementById("2-3").style.backgroundColor = "#ff2800";
      document.getElementById("2-3").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-4")) {
    let answerSquareFive = document
      .getElementById("1-4")
      .querySelector("div").innerText;
    if (answerSquareFive === animals[4][x]) {
      document.getElementById("1-4").style.backgroundColor = "lightgreen";
      document.getElementById("2-4").style.backgroundColor = "lightgreen";
      document.getElementById("2-4").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-4").style.backgroundColor = "#ff2800";
      document.getElementById("2-4").style.backgroundColor = "#ff2800";
      document.getElementById("2-4").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-5")) {
    let answerSquareSix = document
      .getElementById("1-5")
      .querySelector("div").innerText;
    if (answerSquareSix === animals[5][x]) {
      document.getElementById("1-5").style.backgroundColor = "lightgreen";
      document.getElementById("2-5").style.backgroundColor = "lightgreen";
      document.getElementById("2-5").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-5").style.backgroundColor = "#ff2800";
      document.getElementById("2-5").style.backgroundColor = "#ff2800";
      document.getElementById("2-5").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-6")) {
    let answerSquareSeven = document
      .getElementById("1-6")
      .querySelector("div").innerText;
    if (answerSquareSeven === animals[6][x]) {
      document.getElementById("1-6").style.backgroundColor = "lightgreen";
      document.getElementById("2-6").style.backgroundColor = "lightgreen";
      document.getElementById("2-6").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-6").style.backgroundColor = "#ff2800";
      document.getElementById("2-6").style.backgroundColor = "#ff2800";
      document.getElementById("2-6").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  if (answerIds.includes("1-7")) {
    let answerSquareEight = document
      .getElementById("1-7")
      .querySelector("div").innerText;
    if (answerSquareEight === animals[7][x]) {
      document.getElementById("1-7").style.backgroundColor = "lightgreen";
      document.getElementById("2-7").style.backgroundColor = "lightgreen";
      document.getElementById("2-7").innerHTML = correctIcon;
      correctCount += 1;
    } else {
      document.getElementById("1-7").style.backgroundColor = "#ff2800";
      document.getElementById("2-7").style.backgroundColor = "#ff2800";
      document.getElementById("2-7").innerHTML = incorrectIcon;
      incorrectCount += 1;
    }
  }

  correctAnswers.innerText = `Correct answers: ${correctCount}`;
  incorrectAnswers.innerText = `Incorrect answers: ${incorrectCount}`;
  document
    .getElementById("answer-count")
    .append(correctAnswers, incorrectAnswers);

  let message = document.createElement("div");
  if (correctCount === 6) {
    message.innerHTML =
      "<br> Congratulations! You got all the answers correct!";
  } else {
    message.innerHTML = `<br> You got ${correctCount} answers correct. Play again to practise?`;
  }
  document.getElementById("answer-count").append(message);
}

function playAgain() {
  // How to reload the current document taken from https://www.w3schools.com/jsref/met_loc_reload.asp
  location.reload();
}
