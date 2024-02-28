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
 * Create a grid for the game when the window has finished loading
 * How to use a for loop to create a grid when the window loads was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 */
window.onload = function () {
  let answersArea = document.getElementById("answers-area");
  let answerColumns = 3;
  let answerRows = 8;
  for (let row = 0; row < answerRows; row++) {
    for (let col = 0; col < answerColumns; col++) {
      let square = document.createElement("div");
      square.id = col.toString() + "-" + row.toString();
      //square.textContent = square.id;
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
    //option.textContent = option.id;
    optionsArea.append(option);
  }
  selectGame();
};

/**
 * Display the selected game based on "mode" and "theme" values
 */
function selectGame() {
  let mode = document.getElementById("mode").value;
  let theme = document.getElementById("theme").value;
  if (mode === "eng-to-fin" && theme === "animals") {
    displayEngFinAnimals();
  }
}

/**
 * Allow the user to drag and drop the option next to the correct word
 * How to use drag and drop event listeners was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
 * and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event
 * and Darwin Tech JavaScript Drag and Drop Youtube tutorial: https://www.youtube.com/watch?v=_G8G1OrEOrI
 */
function playGame() {
  let selectedOption;

  // Add "drop-zone" class to all div elements with an id starting with "1-" to allow the drop zone to be styled differently
  // How to convert NodeList to Array taken from https://www.geeksforgeeks.org/fastest-way-to-convert-javascript-nodelist-to-array/
  let dropZone = Array.from(document.querySelectorAll("[id^='1-'"));
  for (let x in dropZone) {
    dropZone[x].classList.add("drop-zone");
    dropZone[x].addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    dropZone[x].addEventListener("drop", function (event) {
      dropZone[x].prepend(selectedOption);
    });
  }

  let optionWords = Array.from(document.querySelectorAll("[id^='option-'"));
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
    optionsArea.prepend(selectedOption);
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
  console.log(translatedNames);

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
