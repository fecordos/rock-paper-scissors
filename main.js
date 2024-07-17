"use strict";

(function () {
  const buttons = document.querySelectorAll("[data-choice-button]");
  const outputText = document.querySelector("[data-output-text]");

  for (const button of buttons) {
    button.addEventListener("click", handleClick);
  }

  function handleClick(e) {
    const userChoice = e.target.dataset.choiceButton;
    const computerChoice = getComputerChoice();
    const output = decideTheWinner(userChoice, computerChoice);

    if (!userChoice) return;

    displayOutput(output);
  }

  function getComputerChoice() {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function decideTheWinner(userChoice, computerChoice) {
    switch (userChoice) {
      case "rock":
        switch (computerChoice) {
          case "rock":
            return drawMessage(computerChoice);
          case "paper":
            return loseMessage(userChoice, computerChoice);
          case "scissors":
            return winMessage(userChoice, computerChoice);
        }
        break;
      case "paper":
        switch (computerChoice) {
          case "rock":
            return winMessage(userChoice, computerChoice);
          case "paper":
            return drawMessage(computerChoice);
          case "scissors":
            return loseMessage(userChoice, computerChoice);
        }
        break;
      case "scissors":
        switch (computerChoice) {
          case "rock":
            return loseMessage(userChoice, computerChoice);
          case "paper":
            return winMessage(userChoice, computerChoice);
          case "scissors":
            return drawMessage(computerChoice);
        }
        break;
    }
  }

  function displayOutput(output) {
    outputText.textContent = output;
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function winMessage(userChoice, computerChoice){
    return `Congratulations, you won! ${capitalizeFirstLetter(userChoice)} beats ${computerChoice}!`;
  }

  function loseMessage(userChoice, computerChoice){
    return `Sorry, the computer won. ${capitalizeFirstLetter(computerChoice)} beats ${userChoice}!`;
  }

  function drawMessage(choice){
    return `It's a draw! You both chose ${choice}.`;
  }

})();
