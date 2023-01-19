"use strict"; // strict mode

// define dom elements as variables for easy access

const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const hold = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");
const player1Current = document.querySelector("#current--0");
const player2Current = document.querySelector("#current--1");
const player1Total = document.querySelector("#score--0");
const player2Total = document.querySelector("#score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const name1 = document.querySelector("#name--0");
const name2 = document.querySelector("#name--1");

let playing = true; // set the current player
// true will represent player1, false will represent player2
// this makes it easy to switch as we simply set playing to the opposite of what it is

let currentPlayer; // this will hold the DOM element for the currently playing player
let playerCurrentScoreValue = 0; // this will hold the value for the currently playing player's current score
let playerTotalScoreValue; // this will hold the value for the currently playing player's total score

let playerCurrentScore; // holds the dom element for the current score element for the current player
let playerTotalScore; // holds the dom element for the total score element for the current player
let currentName; // holds the dom element for the current player's name


class player{

  #currentScore = 0;
  #totalScore = 0;
  #nameElement;
  #playerElement;
  #currentScoreElement;
  #totalScoreElement;

  constructor(playerNum){
    this.#nameElement = document.querySelector(`#name--${playerNum-1}`);
    this.#playerElement = document.querySelector(`.player--${playerNum-1}`);
    this.#currentScoreElement = document.querySelector(`#current--${playerNum-1}`);
    this.#totalScoreElement = document.querySelector(`#score--${playerNum-1}`);

  }

  #changeStatus(){
    this.#playerElement.classList.toggle("player--active");
  }

 
  #resetScore(){
    this.#currentScore = 0;
    this.#currentScoreElement.textContent = 0;
  }

  #addToCurrent(num){
    this.#currentScore += num;
    this.#currentScoreElement.textContent = this.#currentScore;
  }

  #addToTotal(){
    this.#totalScore += this.#currentScore;
    this.#totalScoreElement.textContent = this.#totalScore;
    this.#resetScore();
  }

  #reset(){
    
  }

}

const switchPlayers = function () {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

// this is the function that will be called when the dice is rolled. 
// make a separate function because we want to be able to remove the event listener as well when the game is over
const roll = function (){
  if (playing){ // if it's player 1's turn
    // set all the variables we defined above to player 1's information
    currentPlayer = player1;
    playerTotalScoreValue = player1Total.textContent;
    playerCurrentScore = player1Current;
    playerTotalScore = player1Total;
    currentName = name1;
  }else{
    // otherwise it must be player 2's turn
    // set all the variables we defined to player 2's information
    currentPlayer = player2;
    playerTotalScoreValue = player2Total.textContent;
    playerCurrentScore = player2Current;
    playerTotalScore = player2Total;
    currentName = name2;
  }

  // do the dice roll
  // get a random number, multiply by 6 to get one between 0 and 5
  // add one to get between 1 and 6
  // truncate to get rid of any decimal points
  const roll = Math.trunc(Math.random() * 6 + 1);

  // change the image to the appropriate dice roll
  diceImg.src = `diceImages/dice-${roll}.png`;

  // if the roll is 1
  if (roll === 1) { 
    // the player's current score goes to 0
    playerCurrentScore.textContent = 0;

    // the other player becomes the current player
    playing = !playing;

    // call the switch players function to toggle the css elements for active players
    switchPlayers(playing);
  } else {
    // if a 1 was not rolled
    // cast the current score to a number
    // add the roll
    // set that as the new text content for the current score element
    playerCurrentScore.textContent = Number(playerCurrentScore.textContent) + roll;
  }
};

// this is the function that will be called when the player chooses to hold
// make a separate function because we want to be able to remove the event listener as well when the game is over
const holdFunction = function () {
  // set the total score value to the current total score value + the current score text content
  playerTotalScoreValue = Number(playerTotalScoreValue) + Number(playerCurrentScore.textContent);

  // set the text content of the total score element equal to that value
  playerTotalScore.textContent = playerTotalScoreValue;

  // reset the current score to 0
  playerCurrentScore.textContent = 0;

  // if the total score is more than 100
  // this player has won
  if (playerTotalScoreValue >= 100) {
    // add the winner elements to the player and name elements
    currentPlayer.classList.add("player--winner");
    currentName.classList.add("player--winner");

    // remove the event listeners so you can't click rolldice and hold after the game is over
    rollDice.removeEventListener("click", roll);
    hold.removeEventListener("click", holdFunction);
    return; // exit the function
  }
  // the game is ongoing

  playing = !playing; // change the player
  switchPlayers(playing); // toggle the css elements
}

// add the event listeners with the appropriate functions
rollDice.addEventListener("click", roll);
hold.addEventListener("click", holdFunction);


// the event listener for the new game button
newGame.addEventListener("click", function () {
  // we need to reset everything in here as the player wants to start a new game

  // set playing to player 1's value
  playing = true;

  // add the event listeners back to rollDice and hold, or else those buttons won't work
  rollDice.addEventListener("click", roll);
  hold.addEventListener("click", holdFunction);

  // set all scores to 0
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  player1Total.textContent = 0;
  player2Total.textContent = 0;


  // one of the players had to have won
  // it's not really worth keeping track of who and checking that in here
  // so just remove the winner attribute from both players and both names
  // it will only be removed if the attribute is actually there
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  name1.classList.remove("player--winner");
  name2.classList.remove("player--winner");
  
  // player 1 is the current player now
  // so add the active attributes to both the player and the name
  player1.classList.add("player--active");
  name1.classList.add("player--active");

  // remove the active attribute from player2's section and player2's name
  player2.classList.remove("player--active");
  name2.classList.remove("player--active");


});




