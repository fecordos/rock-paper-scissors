"use strict";

(function () {
  const choiceButtons = document.querySelectorAll("[data-choice-button]");
  const gameModeButtons = document.querySelectorAll("[data-game-mode-button]");
  const outputText = document.querySelector("[data-output-text]");

  let playerScore = 0;
  let computerScore = 0;

  const normalChoices = ["rock", "paper", "scissors"];
  const lizardSpockChoices = ["rock", "paper", "scissors", "lizard", "spock"];
  let currentChoices = normalChoices;

  const outcomes = {
    Rock: {
      winsAgainst: { Scissors: "crushes", Lizard: "crushes" },
      losesTo: { Paper: "covers", Spock: "vaporizes" },
    },
    Paper: {
      winsAgainst: { Rock: "covers", Spock: "disproves" },
      losesTo: { Scissors: "cuts", Lizard: "eats" },
    },
    Scissors: {
      winsAgainst: { Paper: "cuts", Lizard: "decapitates" },
      losesTo: { Rock: "crushes", Spock: "smashes" },
    },
    Lizard: {
      winsAgainst: { Paper: "eats", Spock: "poisons" },
      losesTo: { Rock: "crushes", Scissors: "decapitates" },
    },
    Spock: {
      winsAgainst: { Scissors: "smashes", Rock: "vaporizes" },
      losesTo: { Paper: "disproves", Lizard: "poisons" },
    },
  };

  displayGameScore(playerScore, computerScore);

  for (const choiceButton of choiceButtons) {
    choiceButton.addEventListener("click", handleClick);
  }

  for (const gameModeButton of gameModeButtons) {
    gameModeButton.addEventListener("click", handleGameMode);
  }

  function handleClick(e) {
    const userChoice = e.target.dataset.choiceButton;
    const computerChoice = getComputerChoice();
    const output = decideTheWinner(userChoice, computerChoice);

    if (!userChoice) return;

    displayOutput(output);
  }

  function handleGameMode(e) {
    const gameMode = e.target.dataset.gameModeButton;
    const lizardButton = choiceButtons[3];
    const spockButton = choiceButtons[4];

    if (gameMode === "normal") {
      lizardButton.classList.add("hidden");
      spockButton.classList.add("hidden");
      currentChoices = normalChoices;
      changeColorOfGMButton(gameMode);

    } else if ((gameMode === "lizard-spock")) {
      lizardButton.classList.remove("hidden");
      spockButton.classList.remove("hidden");
      currentChoices = lizardSpockChoices;
      changeColorOfGMButton(gameMode);
    }
  }

  function changeColorOfGMButton(gameMode){
    const normalButton = gameModeButtons[0];
    const lizardSpockButton = gameModeButtons[1];

    if(gameMode === 'normal'){
      normalButton.classList.add("selected");
      lizardSpockButton.classList.remove("selected");
    } else if( gameMode === 'lizard-spock'){
      lizardSpockButton.classList.add("selected");
      normalButton.classList.remove("selected");
    }
  }

  function getComputerChoice() {
    return currentChoices[Math.floor(Math.random() * currentChoices.length)];
  }

  function decideTheWinner(userChoice, computerChoice) {
    let resultMessage = `You chose: ${userChoice}. Computer chose: ${computerChoice}. `;

    if (userChoice === computerChoice) {
      resultMessage += "It's a tie!";
    } else if (
      outcomes[capitalizeFirstLetter(userChoice)].winsAgainst[
        capitalizeFirstLetter(computerChoice)
      ]
    ) {
      resultMessage += `You win! ${capitalizeFirstLetter(userChoice)} ${
        outcomes[capitalizeFirstLetter(userChoice)].winsAgainst[
          capitalizeFirstLetter(computerChoice)
        ]
      } ${computerChoice}.`;
      playerScore++;
    } else {
      resultMessage += `You lose! ${capitalizeFirstLetter(computerChoice)} ${
        outcomes[capitalizeFirstLetter(computerChoice)].winsAgainst[
          capitalizeFirstLetter(userChoice)
        ]
      }.`;
      computerScore++;
    }

    displayGameScore(playerScore, computerScore);
    return resultMessage;
  }

  function displayOutput(output) {
    outputText.textContent = output;
  }

  function displayGameScore(playerScore, computerScore) {
    const playerOutputScore = document.querySelector("[data-output-game-score='player']");
    const computerOutputScore = document.querySelector("[data-output-game-score='computer']");

    playerOutputScore.textContent = playerScore;
    computerOutputScore.textContent = computerScore;
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
})();
