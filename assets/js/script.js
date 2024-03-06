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
  document.getElementById("play-area").style.display = "flex";
  document.getElementById("play-button").style.display = "none";
  document.getElementById("selection-area").style.display = "none";
  document.getElementById("info-area").style.display = "none";

  const answersArea = document.getElementById("answers-area");
  const answerColumns = 3;
  const answerRows = 8;
  for (let row = 0; row < answerRows; row++) {
    for (let col = 0; col < answerColumns; col++) {
      let square = document.createElement("div");
      square.id = col.toString() + "-" + row.toString();
      answersArea.append(square);
    }
  }

  const optionsArea = document.getElementById("options-area");
  const optionRows = 6;
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
 * Allow the user to move their selected option next to the correct word
 * How to use drag and drop event listeners was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 * and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event
 * and Darwin Tech JavaScript Drag and Drop Youtube tutorial: https://www.youtube.com/watch?v=_G8G1OrEOrI
 */
function playGame() {
  // Add submit button
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.id = "submit-answer";
  submitBtn.addEventListener("click", checkAnswer);
  document.getElementById("buttons").append(submitBtn);

  let selectedOption;
  // How to convert NodeList to Array taken from https://www.geeksforgeeks.org/fastest-way-to-convert-javascript-nodelist-to-array/
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  const dropZones = Array.from(document.querySelectorAll("[id^='1-']"));
  for (let dropZone in dropZones) {
    // Add "drop-zone" class to all the dropZone div elements to make it easier to style them
    dropZones[dropZone].classList.add("drop-zone");
    dropZones[dropZone].addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    dropZones[dropZone].addEventListener("drop", function (event) {
      event.preventDefault();
      // Check if the dropzone target already has a div inside it to prevent two options being put inside the same dropzone element
      if (event.target.hasChildNodes()) {
        return;
      } else {
        event.target.append(selectedOption);
      }
    });
    dropZones[dropZone].addEventListener(
      "touchstart",
      function (event) {
        if (event.target.hasChildNodes()) {
          return;
        } else {
          event.target.append(selectedOption);
          selectedOption.style.color = "inherit";
        }
      },
      // Passive event listener added to improve scrolling performance - https://medium.com/@Esakkimuthu/passive-event-listeners-5dbb1b011fb1
      { passive: false }
    );
  }

  const options = Array.from(document.querySelectorAll("[id^='option-']"));
  for (let option in options) {
    options[option].addEventListener("dragstart", function () {
      selectedOption = this;
    });
    options[option].addEventListener(
      "touchstart",
      function () {
        selectedOption = this;
        selectedOption.style.color = "orange";
      },
      { passive: false }
    );
  }

  const optionsArea = document.getElementById("options-area");
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
  //Select all the divs that have an id that starts with "0-" i.e. the divs that hold the words that needs to be translated
  const originalWords = document.querySelectorAll("[id^='0-'");
  //Select all the divs that have an id that starts with "option-" i.e. the divs that hold the options/translated words
  const options = document.querySelectorAll("[id^='option-'");
  // Add the English words in the game area
  let x = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = animals[x][0];
    if (x < 7) {
      x += 1;
    }
  }

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

  // Create an array of 6 random animal names in Finnish using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][1]);
  }

  // Add the random translated animal names to the options area
  let c = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[c];
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
  //Select all the divs that have an id that starts with "0-" i.e. the divs that hold the words that needs to be translated
  const originalWords = document.querySelectorAll("[id^='0-'");
  //Select all the divs that have an id that starts with "option-" i.e. the divs that hold the options/translated words
  let options = document.querySelectorAll("[id^='option-'");
  // Add the Finnish words in the game area
  let x = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = animals[x][1];
    if (x < 7) {
      x += 1;
    }
  }

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

  // Create an array of 6 random animal names in English using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][0]);
  }

  // Add the random translated animal names to the options area
  let c = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[c];
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
  const draggables = document.getElementsByClassName("draggable");
  for (let a in draggables) {
    draggables[a].draggable = false;
  }
  // Create "Play Again" button
  const againBtn = document.createElement("button");
  againBtn.innerText = "Play Again";
  againBtn.id = "play-again";
  againBtn.addEventListener("click", playAgain);
  document.getElementById("buttons").append(againBtn);

  //Check Answer
  const answerSquares = Array.from(document.querySelectorAll("[id^='1-']"));
  let answers = [];
  let answerIds = [];
  // Check which answer squares have child node i.e. draggable answers and add those to the answers array
  for (let square in answerSquares) {
    if (answerSquares[square].hasChildNodes()) {
      answers.push(answerSquares[square]);
    }
  }
  // Create an array of ids of the dropzone divs that hold an answer
  for (let answer in answers) {
    answerIds += answers[answer].id + " ";
  }
  // Correct and Incorrect icons
  const correctIcon = '<i class="fa-solid fa-check"></i>';
  const incorrectIcon = '<i class="fa-solid fa-xmark"></i>';
  // Count correct and incorrect answers
  let correctCount = 0;
  let incorrectCount = 0;
  let correctAnswers = document.createElement("span");
  let incorrectAnswers = document.createElement("span");

  // Check which game the player is playing by checking the inner text of the first game square (0-0)
  // Assign the value 1 to language variable if the first word is in English and 0 if the first word is in Finnish
  const firstGameWord = document.getElementById("0-0").innerText;
  let language;
  let theme;
  if (firstGameWord === animals[0][0]) {
    language = 1;
    theme = animals;
  } else if (firstGameWord === animals[0][1]) {
    language = 0;
    theme = animals;
  }

  // Check if an ID is in the answerIds array and if so create an answerSquare variable and check if it's inner text matches the correct answer
  let y = 0;
  while (y < 8) {
    let id = "1-" + y;
    let idTwo = "2-" + y;
    if (answerIds.includes(id)) {
      let answerSquare = document
        .getElementById(id)
        .querySelector("div").innerText;
      if (answerSquare === theme[y][language]) {
        document.getElementById(id).style.backgroundColor = "#adeaad";
        document.getElementById(idTwo).style.color = "lightgreen";
        document.getElementById(idTwo).innerHTML = correctIcon;
        correctCount += 1;
        y += 1;
      } else {
        document.getElementById(id).style.backgroundColor = "#ea5757";
        document.getElementById(idTwo).style.color = "#ff2800";
        document.getElementById(idTwo).innerHTML = incorrectIcon;
        incorrectCount += 1;
        y += 1;
      }
    } else {
      y += 1;
      continue;
    }
  }

  // Display the count of total correct and incorrect answers and display a message to the user
  correctAnswers.innerText = `Correct answers: ${correctCount}`;
  incorrectAnswers.innerText = `Incorrect answers: ${incorrectCount}`;
  document
    .getElementById("answer-count")
    .append(correctAnswers, incorrectAnswers);

  const message = document.createElement("div");
  if (correctCount === 6) {
    message.innerHTML =
      "<br> Congratulations! You got all the answers correct!";
  } else if (correctCount === 1) {
    message.innerHTML = `<br> You got ${correctCount} answer correct. Play again to practise?`;
  } else {
    message.innerHTML = `<br> You got ${correctCount} answers correct. Play again to practise?`;
  }
  document.getElementById("answer-count").append(message);
}

// Create function to allow the user to restart the game by reloading the document
function playAgain() {
  // How to reload the current document taken from https://www.w3schools.com/jsref/met_loc_reload.asp
  location.reload();
}
