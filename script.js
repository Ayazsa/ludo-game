'use strict';
//selecting elements//
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const current0El = document.getElementById('current--0');
const score1El = document.querySelector('#score--1');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
let scores, currentScore, activePlayer, playing;
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//starting conditions//
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current0El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
//rolling dice function//
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for roll value 1 : if 1, change the player
    if (dice !== 1) {
      // Add the value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if players current score >==100;
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //3.Switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
