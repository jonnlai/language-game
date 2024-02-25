//https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js

//How to use a for loop to create a grid when the window loads was taken from: https://github.com/ImKennyYip/slide-puzzle/blob/master/puzzle.js
window.onload = function () {
  let answersArea = document.getElementById("answers-area");
  let answerColumns = 3;
  let answerRows = 8;
  for (let row = 0; row < answerRows; row++) {
    for (let col = 0; col < answerColumns; col++) {
      let square = document.createElement("div");
      square.id = col.toString() + "-" + row.toString();
      square.textContent = square.id;
      answersArea.append(square);
    }
  }
};
