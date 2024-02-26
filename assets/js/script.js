// Object of different animal names in different languages
const animals = {
  dog: ["dog", "koira", "perro"],
  cat: ["cat", "kissa", "gato"],
  bird: ["bird", "lintu", "pajaro"],
  bear: ["bear", "karhu", "oso"],
  wolf: ["wolf", "susi", "lobo"],
  snake: ["snake", "käärme", "serpiente"],
  horse: ["horse", "hevonen", "caballo"],
  sheep: ["sheep", "lammas", "oveja"],
};

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
 * Display English to Finnish animal names game
 */
function displayEngFinAnimals() {
  // How to use Javascript wildcard was taken from: https://www.js-craft.io/blog/javascript-use-queryselectorall-with-wildcards/
  //Select the div that's id starts with "0-"
  let gameWords = document.querySelectorAll("[id^='0-'");
  console.log(gameWords);
  let animalNames = Object.values(animals);
  console.log(animalNames);
  let optionWords = document.querySelectorAll("[id^='option-'");
  console.log(optionWords);

  let x = 0;

  for (let y in gameWords) {
    gameWords[y].textContent = animalNames[x][0];
    if (x < 7) {
      x += 1;
    }
  }

  let b = 0;
  for (let a in optionWords) {
    console.log(optionWords[a]);
    optionWords[a].textContent = animalNames[b][1];
    if (b < 5) {
      b += 1;
    }
  }
  // let originalName = document.getElementById("0-0").textContent;
  // console.log(document.getElementById("0-0").textContent);
  // originalName.textContent = animals.dog[0];
  // let translatedName = document.getElementById("option0");
  // translatedName.textContent = animals.dog[1];
}
//   for (animal in animals) {
//     let engName = document.getElementById("0-0");
//     engName.innerText = animals.dog[0];
//     console.log(animal);
//   }
// }
