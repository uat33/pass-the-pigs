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

let playing = 1; // set who is the starting player

// create four variables
let currentScore; // score of player playing
let totalScore; // total score of player playing
let player; // the current player
let playerName; 

const current = function (player) {
  return player === 1 ? player1Current : player2Current;
};
const total = function (player) {
  return player === 1 ? player1Total : player2Total;
};
const nowPlaying = function (player) {
  return player === 1 ? player1 : player2;
};
const pName = function (player) {
  return player === 1 ? name1 : name2;
};

rollDice.addEventListener("click", function () {
  const roll = Math.trunc(Math.random() * 6 + 1);
  diceImg.src = "diceImages/dice-" + roll + ".png"; // change image
  // switchPlayers(playing);
  currentScore = current(playing);
  totalScore = total(playing);
  player = nowPlaying(playing);
  playerName = pName(playing);
  if (roll === 1) {
    currentScore.textContent = 0;
    playing === 1 ? (playing = 2) : (playing = 1);
    switchPlayers(playing);
  } else {
    currentScore.textContent = Number(currentScore.textContent) + roll;
  }
});

hold.addEventListener("click", function () {
  totalScore.textContent = Number(totalScore.textContent) + 
                           Number(currentScore.textContent);
  currentScore.textContent = 0;

  if (Number(totalScore.textContent) >= 100) {
    player.classList.add("player--winner");
    playerName.classList.add("player--winner");
  }

  playing === 1 ? (playing = 2) : (playing = 1);
  switchPlayers(playing);
});

newGame.addEventListener("click", function () {
  playing = 1;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  player1Total.textContent = 0;
  player2Total.textContent = 0;
  removeAtts(player1, "player--winner");
  removeAtts(player2, "player--winner");
  removeAtts(player2, "player--active");
  removeAtts(name2, "player--active");
  removeAtts(name1, "player--winner");
  removeAtts(name2, "player--winner");
});

function switchPlayers(playing) {
  if (playing === 1) {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  } else {
    player2.classList.add("player--active");
    player1.classList.remove("player--active");
  }
}

function removeAtts(player, att) {
  if (player.classList.contains(att)) {
    player.classList.remove(att);
  }
}
