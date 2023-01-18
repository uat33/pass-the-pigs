"use strict"; // strict mode

// define elements as variables for easy access

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

let currentPlayer; // this will hold the DOM element for the currently playing player
let playerCurrentScoreValue = 0; // this will hold the value for the currently playing player's current score
let playerTotalScoreValue; // this will hold the value for the currently playing player's total score

let playerCurrentScore; // holds the dom element for the current score element for the current player
let playerTotalScore; // holds the dom element for the total score element for the current player
let currentName; // holds the dom element for the current player's name
// let overallScore = 0;
/* 
// create four variables
let currentScore; // score of player playing
let totalScore; // total score of player playing
let player; // the current player
let playerName; 

 */


const current = function () {
  
  if (playing){
    currentPlayer = player1;
    playerTotalScoreValue = player1Total.textContent;
    playerCurrentScore = player1Current;
    playerTotalScore = player1Total;
    currentName = name1;
    return;
  }
  currentPlayer = player2;
  playerTotalScoreValue = player2Total.textContent;
  playerCurrentScore = player2Current;
  playerTotalScore = player2Total;
  currentName = name2;
};
/* const total = function (player) {
  return player === 1 ? player1Total : player2Total;
};
const nowPlaying = function (player) {
  return player === 1 ? player1 : player2;
};
const pName = function (player) {
  return player === 1 ? name1 : name2;
}; */

rollDice.addEventListener("click", function () {

  if (playing){
    currentPlayer = player1;
    playerTotalScoreValue = player1Total.textContent;
    playerCurrentScore = player1Current;
    playerTotalScore = player1Total;
    currentName = name1;
  }else{
    currentPlayer = player2;
    playerTotalScoreValue = player2Total.textContent;
    playerCurrentScore = player2Current;
    playerTotalScore = player2Total;
    currentName = name2;
  }
  const roll = Math.trunc(Math.random() * 6 + 1);

  diceImg.src = "diceImages/dice-" + roll + ".png"; // change image
  // switchPlayers(playing);
  // currentScore = current(playing);
  // totalScore = total(playing);
  // player = nowPlaying(playing);
  // playerName = pName(playing);
  if (roll === 1) {
    playerCurrentScore.textContent = 0;
    playing === !playing;
    switchPlayers(playing);
  } else {
    playerCurrentScore.textContent = Number(playerCurrentScore.textContent) + roll;
  }
});

hold.addEventListener("click", function () {
  
  playerTotalScoreValue = Number(playerTotalScoreValue + Number(playerCurrentScore.textContent));
  console.log(typeof playerTotalScoreValue);
  playerTotalScore.textContent = playerTotalScoreValue;
  playerCurrentScore.textContent = 0;

  if (playerTotalScoreValue >= 100) {
    currentPlayer.classList.add("player--winner");
    currentName.classList.add("player--winner");

  }

  playing === !playing;
  switchPlayers(playing);
});

newGame.addEventListener("click", function () {
  playing = true;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  player1Total.textContent = 0;
  player2Total.textContent = 0;

  player1.classList.remove("player--winner");
  player2.classList.remove("player--active");
  player2.classList.remove("player--winner");
  name1.classList.remove("player--winner");
  name2.classList.remove("player--winner")
  name2.classList.remove("player--active")


  // removeAtts(player1, "player--winner");
  // removeAtts(player2, "player--winner");
  // removeAtts(player2, "player--active");
  // removeAtts(name2, "player--active");
  // removeAtts(name1, "player--winner");
  // removeAtts(name2, "player--winner");
});

function switchPlayers() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
}

function removeAtts(player, att) {
  if (player.classList.contains(att)) {
    player.classList.remove(att);
  }
}
