//require the necessary npm packages
import inquirer from "inquirer";
import isLetter from "is-letter";
//require objects/exports
import Word from "./word.js";
import List from "./list.js";

let wordBank = List.newWord.wordList;
let guessesRemaining = 10;
//Empty Array. This will hold letters that have been guessed already.
let guessedLetters = [];
let currentWord;
let display = 0;

startGame();

function startGame() {
  console.log("---------------------------------------------------------");
  console.log("");
  console.log("Welcome to Hip-Hop Hangman!");
  console.log("");
  console.log("---------------------------------------------------------");

  if (guessedLetters.length > 0) {
    guessedLetters = [];
  }
  inquirer
    .prompt([
      {
        name: "play",
        type: "confirm",
        message: "Ready to play?",
      },
    ])
    .then(function (answer) {
      if (answer.play) {
        newGame();
      } else {
        console.log(
          "Okay. you don't have to play with me if oyu don't want to!"
        );
      }
    });
}

function newGame() {
  if (guessesRemaining === 10) {
    console.log("Annnd");
    console.log("Gooooo!");

    let randNum = Math.floor(Math.random() * wordBank.length);
    currentWord = new Word(wordBank[randNum]);
    currentWord.getLetters(); //initiats get letters function
    console.log(currentWord.wordRender());
    userPrompts();
  } else {
    resetGuessesRemaining();
    newGame();
  }
}
function resetGuessesRemaining() {
  guessesRemaining = 10;
}
function userPrompts() {
  inquirer
    .prompt([
      {
        name: "chosenLtr",
        type: "input",
        message: "Choose a letter, my friend:",
        validate: function (value) {
          if (isLetter(value)) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then(function (ltr) {
      let letterReturned = ltr.chosenLtr;
      let guessedAlready = false;
      for (let i = 0; i < guessedLetters.length; i++) {
        if (letterReturned === guessedLetters[i]) {
          guessedAlready = true;
        }
      }
      if (guessedAlready === false) {
        guessedLetters.push(letterReturned);

        let found = currentWord.letterCheck(letterReturned);

        if (found === 0) {
          console.log("Wrong!");
          guessesRemaining--;
          display++;
          console.log("Guesses remain: " + guessesRemaining);
          //console.log([display-1]); //check this later

          console.log("\n***************");
          console.log(currentWord.wordRender());
          console.log("\n***************");

          console.log("Letters guessed: " + guessedLetters);
        } else {
          console.log("Woohoo! You're pretty good!");

          if (currentWord.wordCheck() === true) {
            console.log(currentWord.wordRender());
            console.log("Congrats! You won!");
          } else {
            console.log("Guesses remianing: " + guessesRemaining);
            console.log(currentWord.wordRender());
            console.log("\n***************");
            console.log("Letters guessed: " + guessedLetters);
          }
        }
        if (guessesRemaining > 0 && currentWord.wordFound === false) {
          userPrompts();
        } else if (guessesRemaining === 0) {
          console.log("Game over!");
          console.log("The word you were guessing was: " + currentWord.word);
        }
      } else {
        console.log("You've guessed that letter already. Try again.");
        userPrompts();
      }
    });
}
``