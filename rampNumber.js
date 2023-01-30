"use strict";

// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rampNumber = function (A = []) {
  let max = 0;
  const stack = [0];
  for (let i = 1; i < A.length; i++) {
    if (A[i] < A[stack[stack.length - 1]]) {
      stack.push(i);
    }
  }
  for (let i = A.length - 1; i >= 0; i--) {
    while (A[i] >= A[stack[stack.length - 1]]) {
      max = Math.max(max, i - stack.pop());
    }
    return `Your number has ${max} ramp numbers`;
  }
};

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question("Pick a positive integer to test my ramp numbers function: ", (answer) => {
    let userInput = answer.trim();
    console.log(rampNumber(userInput));
    getPrompt();
  });
};

getPrompt();
