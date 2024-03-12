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

// An array of different words relating to nature
const nature = [
  ["tree", "puu", "árbol"],
  ["flower", "kukka", "flor"],
  ["forest", "metsä", "bosque"],
  ["lake", "järvi", "lago"],
  ["sea", "meri", "mar"],
  ["berry", "marja", "baya"],
  ["sun", "aurinko", "sol"],
  ["rain", "sade", "lluvia"],
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
  } else if (mode === "eng-to-fin" && theme === "nature") {
    displayEngFinNature();
  } else if (mode === "fin-to-eng" && theme === "nature") {
    displayFinEngNature();
  }
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
  let i = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = animals[i][0];
    if (i < 7) {
      i += 1;
    }
  }

  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  i = 0;
  while (i < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      i += 1;
    }
  }

  // Create an array of 6 random animal names in Finnish using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][1]);
  }

  // Add the random translated animal names to the options area
  i = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[i];
    if (i < 5) {
      i += 1;
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
  let i = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = animals[i][1];
    if (i < 7) {
      i += 1;
    }
  }

  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  i = 0;
  while (i < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      i += 1;
    }
  }

  // Create an array of 6 random animal names in English using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(animals[randomIndex[index]][0]);
  }

  // Add the random translated animal names to the options area
  i = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[i];
    if (i < 5) {
      i += 1;
    }
  }

  playGame();
}

/**
 * Display English to Finnish nature words game
 */
function displayEngFinNature() {
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  //Select all the divs that have an id that starts with "0-" i.e. the divs that hold the words that needs to be translated
  const originalWords = document.querySelectorAll("[id^='0-'");
  //Select all the divs that have an id that starts with "option-" i.e. the divs that hold the options/translated words
  const options = document.querySelectorAll("[id^='option-'");
  // Add the English words in the game area
  let i = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = nature[i][0];
    if (i < 7) {
      i += 1;
    }
  }

  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  i = 0;
  while (i < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      i += 1;
    }
  }

  // Create an array of 6 random nature words in Finnish using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(nature[randomIndex[index]][1]);
  }

  // Add the random translated nature words to the options area
  i = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[i];
    if (i < 5) {
      i += 1;
    }
  }

  playGame();
}

/**
 * Display Finnish to English nature words game
 */
function displayFinEngNature() {
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  //Select all the divs that have an id that starts with "0-" i.e. the divs that hold the words that needs to be translated
  const originalWords = document.querySelectorAll("[id^='0-'");
  //Select all the divs that have an id that starts with "option-" i.e. the divs that hold the options/translated words
  const options = document.querySelectorAll("[id^='option-'");
  // Add the English words in the game area
  let i = 0;
  for (let word in originalWords) {
    originalWords[word].textContent = nature[i][1];
    if (i < 7) {
      i += 1;
    }
  }

  let randomIndex = [];
  let translatedNames = [];

  // Create an array of random index numbers
  i = 0;
  while (i < 6) {
    let num = Math.floor(Math.random() * 8);
    if (randomIndex.includes(num)) {
      continue;
    } else {
      randomIndex.push(num);
      i += 1;
    }
  }

  // Create an array of 6 random nature words in Finnish using the random index numbers
  for (let index in randomIndex) {
    translatedNames.push(nature[randomIndex[index]][0]);
  }

  // Add the random translated nature words to the options area
  i = 0;
  for (let option in options) {
    options[option].textContent = translatedNames[i];
    if (i < 5) {
      i += 1;
    }
  }

  playGame();
}

/**
 * Allow the user to play the game by moving their selected option next to the correct word
 * How to use drag and drop event listeners was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 * and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event
 * and Darwin Tech JavaScript Drag and Drop Youtube tutorial: https://www.youtube.com/watch?v=_G8G1OrEOrI
 * How to use touch events was taken from Web Dev Simplified- Learn Javascript Touch Events in 17 Minutes - https://www.youtube.com/watch?v=TaPdgj8mucI
 */
function playGame() {
  // Add submit button
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.id = "submit-answer";
  submitBtn.addEventListener("click", checkAnswer);
  document.getElementById("buttons").append(submitBtn);

  let selectedOption;

  // Add event listeners to the six available options
  const options = Array.from(document.querySelectorAll("[id^='option-']"));
  for (let option in options) {
    // Add dragstart event listener to allow playing using a mouse
    options[option].addEventListener("dragstart", function () {
      selectedOption = this;
    });
    // Add touchstart event listener to allow playing using a touch screen device
    options[option].addEventListener(
      "touchstart",
      function () {
        // Return any already tapped option divs back the default font weight
        for (let div in options) {
          options[div].style.fontWeight = "inherit";
        }
        // Select the tapped option and change font weight to bold to indicate that it has been selected
        selectedOption = this;
        selectedOption.style.fontWeight = "bold";
      },
      /* Passive event listener added to make the page more responsive - https://medium.com/@Esakkimuthu/passive-event-listeners-5dbb1b011fb1 
      and https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners */
      { passive: true }
    );
  }

  /* Select and add event listeners to all the dropzone squares
  How to convert NodeList to Array taken from https://www.geeksforgeeks.org/fastest-way-to-convert-javascript-nodelist-to-array/
  How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/ */
  const dropZones = Array.from(document.querySelectorAll("[id^='1-']"));
  for (let dropZone in dropZones) {
    // Add "drop-zone" class to all the dropZone div elements to make it easier to style them
    dropZones[dropZone].classList.add("drop-zone");
    // Add dragover and drop event listeners to allow playing using a mouse
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
    // Add touchstart event listener to allow playing using a touch screen device
    dropZones[dropZone].addEventListener(
      "touchstart",
      function (event) {
        // Prevent the user being able to select the dropzone before selecting an option
        if (selectedOption === undefined) {
          return;
        } else if (event.target.hasChildNodes()) {
          return;
        } else {
          event.target.append(selectedOption);
          selectedOption.style.fontWeight = "inherit";
        }
      },
      { passive: true }
    );
  }

  // When using a mouse, allow users to return their selected option back to the options area
  const optionsArea = document.getElementById("options-area");
  optionsArea.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  optionsArea.addEventListener("drop", function () {
    optionsArea.append(selectedOption);
  });
}

/**
 * Function to check the answer and replace submit button with play again button
 */
function checkAnswer() {
  // Remove the submit button after it has been clicked
  document.getElementById("submit-answer").style.display = "none";
  document.getElementById("answer-count").style.display = "block";
  // Stop the draggable elements being draggable
  const draggables = document.getElementsByClassName("draggable");
  for (let draggable in draggables) {
    draggables[draggable].draggable = false;
  }
  // Create "Play Again" button
  const againBtn = document.createElement("button");
  againBtn.innerText = "Play Again";
  againBtn.id = "play-again";
  againBtn.addEventListener("click", playAgain);
  document.getElementById("buttons").append(againBtn);

  // Check Answer
  // Select all the squares that could hold an answer i.e. all the dropzone squares
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
  /* Assign the value 1 to language variable if the first word is in English (to indicate the answers are in Finnish) 
  and 0 if the first word is in Finnish (answers are in English) */
  const firstGameWord = document.getElementById("0-0").innerText;
  let language;
  let theme;
  if (firstGameWord === animals[0][0]) {
    language = 1;
    theme = animals;
  } else if (firstGameWord === animals[0][1]) {
    language = 0;
    theme = animals;
  } else if (firstGameWord === nature[0][0]) {
    language = 1;
    theme = nature;
  } else if (firstGameWord === nature[0][1]) {
    language = 0;
    theme = nature;
  }

  // Check if an ID is in the answerIds array and if so create an answerSquare variable and check if it's inner text matches the correct answer
  let row = 0;
  while (row < 8) {
    let id = "1-" + row;
    let idTwo = "2-" + row;
    if (answerIds.includes(id)) {
      let answerSquare = document
        .getElementById(id)
        .querySelector("div").innerText;
      if (answerSquare === theme[row][language]) {
        document.getElementById(id).style.backgroundColor = "#adeaad";
        document.getElementById(idTwo).style.color = "green";
        document.getElementById(idTwo).innerHTML = correctIcon;
        correctCount += 1;
        row += 1;
      } else {
        document.getElementById(id).style.backgroundColor = "#ea5757";
        document.getElementById(idTwo).style.color = "#ff2800";
        document.getElementById(idTwo).innerHTML = incorrectIcon;
        incorrectCount += 1;
        row += 1;
      }
    } else {
      row += 1;
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
