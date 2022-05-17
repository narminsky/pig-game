'use strict';

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");
let currentScore = 0;
let randomDice = 0;
let activePLayer = 0;
let score = [0, 0];

function resetGame() {
    dice.classList.add("hidden");
    document.getElementById("current--0").innerText = 0;
    document.getElementById("current--1").innerText = 0;
    currentScore = 0;
    activePLayer = 0;
    score = [0, 0];
    setScore();
    whichPlayerIsActive(0);
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
}

function whichPlayerIsActive(i) {
    currentScore = 0;
    document.getElementById(`current--${activePLayer}`).innerText = 0;
    if (i) {
        player1.classList.add("player--active");
        player0.classList.remove("player--active");
        activePLayer = 1;
    } else {
        player0.classList.add("player--active");
        player1.classList.remove("player--active");
        activePLayer = 0;
    }
}

function setScore() {
    document.getElementById("score--0").innerText = score[0];
    document.getElementById("score--1").innerText = score[1];
}

resetGame();

btnNewGame.addEventListener("click", resetGame);

btnRoll.addEventListener("click", function () {
    if (score[activePLayer] < 100) {
        randomDice = Math.trunc(Math.random() * 6 + 1);
        dice.src = `dice-${randomDice}.png`;
        dice.classList.remove("hidden");
        if (randomDice === 1) {
            whichPlayerIsActive(activePLayer === 0 ? 1 : 0);
        } else {
            currentScore += randomDice;
            document.getElementById(`current--${activePLayer}`).innerText = currentScore;
        }
    }
});

btnHold.addEventListener("click", function () {
    score[activePLayer] += currentScore;
    if (score[activePLayer] >= 100) {
        document.querySelector(`.player--${activePLayer}`).classList.add("player--winner");
    } else {
        setScore();
        whichPlayerIsActive(activePLayer === 0 ? 1 : 0);
    }
});