"use strict";
// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const countIt = (str) => {
  let input = str.match(/[a-zA-Z\s]/gi);
  console.log(input);

  // checking string is valid or not
  if (input.length == 0) {
    console.log("Invalid string");
    return;
  }
  //cor loop to iterate over string
  for (let i = 0; i < input.length; i++) {
    //variable counting occurrence
    let count = 0;
    for (let j = 0; j < input.length; j++) {
      if (input[i] == input[j] && i > j) {
        break;
      }
      if (input[i] == input[j]) {
        count++;
      }
    }
    if (count > 0) console.log(`${input[i]} occurs ${count} times`);
  }
};

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question(
    "Pick a word, or sentence and I'll make sure to remove anything but letters and show you their occurances: ",
    (answer) => {
      let userInput = answer.toLowerCase().replace(/\s/g, '');
      console.log(countIt(userInput));
      getPrompt();
    }
  );
};

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C

getPrompt();
