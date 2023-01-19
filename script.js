"use strict"; // strict mode

// define dom elements as variables for easy access

const dice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");
const diceImg = document.querySelector(".dice");


// keep track of the game count
// for fairness sake, we want a different player to have the first turn each round
let gameCount = 1;

// create a player class to manage everything
class Player{

  // variables that can be private are
  // if it needs to be accessed outside the class, it is public
  // all methods need to be accessed outside the class

  // current and total score always start at 0
  #currentScore = 0; 
  totalScore = 0;
  
  // these 4 hold their respective dom elements for the player
  #nameElement; // holds the name
  playerElement; // holds the whole player block
  #currentScoreElement; // holds the current score
  #totalScoreElement; // holds the total score block

  // this value is the player's number
  // get it from constructor and keep track of it for swapping the players as this is the only way to know which is which
  playerNum;

  // get playerNum
  constructor(playerNum){
    this.playerNum = playerNum; // set player num

    // set all the dom elements for this player. 
    // the dom elements start counting at 0, so we need to subtract 1
    this.#nameElement = document.querySelector(`#name--${this.playerNum-1}`);
    this.playerElement = document.querySelector(`.player--${this.playerNum-1}`);
    this.#currentScoreElement = document.querySelector(`#current--${this.playerNum-1}`);
    this.#totalScoreElement = document.querySelector(`#score--${this.playerNum-1}`);

  }
 
  // this method will reset the current score for when a 1 is rolled, or the player chooses to hold
  resetScore(){
    this.#currentScore = 0; // set the score to 0
    this.#currentScoreElement.textContent = this.#currentScore; // update the visual
  }
  // this method will add to the current score for when anything other than 1 is rolled
  addToCurrent(num){ // take the roll as a parameter
    this.#currentScore += num; // add it to the current score
    this.#currentScoreElement.textContent = this.#currentScore; // update the visual
  }


  // this method updates the total score when the player chooses to hold
  addToTotal(){ 
    this.totalScore += this.#currentScore; // add the current score to the total score
    this.#totalScoreElement.textContent = this.totalScore; // update the visual
    this.resetScore(); // reset the current score
  }

  // this method reset everything for a new game
  reset(){
    this.resetScore(); // reset current score
    this.totalScore = 0; // reset the total score
    this.#totalScoreElement.textContent = this.totalScore; // update the total score visual

    // remove the player winner elements in case this is the player that won
    // if it isn't it won't do anything
    this.#nameElement.classList.remove("player--winner");
    this.playerElement.classList.remove("player--winner");


  }

  // a winner method to add the player winner elements to the name and player block
  winner(){
    this.#nameElement.classList.add("player--winner");
    this.playerElement.classList.add("player--winner");
  }


}

// set 1 as the current player
let current = new Player(1);
// 2 as the wawiting player
let other = new Player(2);



// add the event listeners to the dice roll and hold with the appropriate functions
// we don't want to use callback function because we want to remove these event listeners when a game is won
// and then add them back when a new game is started
dice.addEventListener("click", diceRoll);
holdButton.addEventListener("click", hold);


// the event listener for the new game button
// this can have a callback function
newGame.addEventListener("click", function () {
  gameCount++; // update the game count so the appropriate player gets the first turn
  // reset both players 
  current.reset(); 
  other.reset();

  // if either of these conditions are true, the wrong player is in possession of the turn
  if (gameCount % 2 == 0 && current.playerNum === 1 || gameCount % 2 === 1 && current.playerNum === 2){
    swapPlayers(); // so call the swap player method 
  }

  // add the event listeners back to the dice and holdbutton
  dice.addEventListener("click", diceRoll);
  holdButton.addEventListener("click", hold);
});

// the function that will be called when the dice is rolled
function diceRoll (){
  // do the dice roll
  // get a random number, multiply by 6 to get one between 0 and 5
  // add one to get between 1 and 6
  // truncate to get rid of any decimal points
  const roll = Math.trunc(Math.random() * 6 + 1);
  // change the image to the appropriate dice roll
  diceImg.src = `diceImages/dice-${roll}.png`;

  // if the roll is one
  if (roll === 1){
    // reset the current players score
    current.resetScore();
    // switch players
    swapPlayers();
    return; // exit the method here

  }
  // otherwise add the roll to the current player's score.
  current.addToCurrent(roll);
}

// the function that will be called when the player chooses to hold
function hold (){
  current.addToTotal(); // add the current score to the total score

  if (current.totalScore >= 100){ // if the total score is at least 100
    // this player has won

    current.winner(); // call the winner method

    // remove the event listeners so they can't keep clicking these buttons forever
    dice.removeEventListener("click", diceRoll);
    holdButton.removeEventListener("click", hold);
    return; // exit the method
  }
  swapPlayers(); // swap the players
}

// this method is called everytime we want to switch players
function swapPlayers(){
  current.playerElement.classList.remove("player--active"); // remove the active attribute from the current player 
  other.playerElement.classList.add("player--active"); // add it for the other player

  // swap the values in the two variables using a temporary variable
  let temp = current;
  current = other;
  other = temp;
}

