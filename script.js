'use strict';
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");

btnNewGame.addEventListener("click", function () {
    diceImg.classList.add("hidden");
    current0.innerText = 0;
    current1.innerText = 0;
    score0.innerText = 0;
    score1.innerText = 0;
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
});

btnRoll.addEventListener("click", function () {
    if (document.querySelector(".player--winner") == null) {
        const diceNum = Math.trunc(Math.random() * 6 + 1);
        diceImg.src = `dice-${diceNum}.png`;
        diceImg.classList.remove("hidden");
        if (diceNum === 1) {
            whichPlayer((player0.classList.contains("player--active")) ? 1 : 0);
        } else {
            if (player0.classList.contains("player--active")) {
                current0.innerText = Number(current0.innerText) + diceNum;
            } else {
                current1.innerText = Number(current1.innerText) + diceNum;
            }
        }
    }
});

btnHold.addEventListener("click", function () {
    if (document.querySelector(".player--winner") == null) {
        if (player0.classList.contains("player--active")) {
            if (current0.innerText === "0") {
                whichPlayer(1);
            } else {
                (Number(score0.innerText) + Number(current0.innerText) >= 100) ? winner(0) : whichPlayer(1);
                score0.innerText = Number(score0.innerText) + Number(current0.innerText);
            }
        } else {
            if (current1.innerText === "0") {
                whichPlayer(0);
            } else {
                (Number(score1.innerText) + Number(current1.innerText) >= 100) ? winner(1) : whichPlayer(0);
                score1.innerText = Number(score1.innerText) + Number(current1.innerText);
            }
        }
    }
});

function whichPlayer(n) {
    if (n) {
        player0.classList.remove("player--active");
        player1.classList.add("player--active");
        current0.innerText = 0;
    } else {
        player0.classList.add("player--active");
        player1.classList.remove("player--active");
        current1.innerText = 0;
    }

}

function winner(m) {
    if (m) {
        player1.classList.remove("player--active");
        player1.classList.add("player--winner");
    } else {
        player0.classList.remove("player--active");
        player0.classList.add("player--winner");
    }

    diceImg.classList.add("hidden");
}