/* Constants */
const FIRST_PLAYER = "Player 1";

/* Game Logic Variables and State */
let currentPlayer = FIRST_PLAYER;

let player1Score = 0;
let player2Score = 0;

let player1Wins = 0;
let player2Wins = 0;

let holdScore = 0;
let roundScore = 0;

let onesTotal = 0;
let twosTotal = 0;
let threesTotal = 0;
let foursTotal = 0;
let fivesTotal = 0;
let sixesTotal = 0;
let threeOnes = 0;
let fourOnes = 0;
let fiveOnes = 0;
let threeFives = 0;
let fourFives = 0;
let fiveFives = 0;
let largeStraight = 0;

let diceValues = [];
let clickedDice = [];
let unClickedDice = [];

let isGameWon = false;
let isGamePaused = true;

/* DOM References */
const rollButtonEl = document.querySelector('#roll-button');
const reRollButtonEl = document.querySelector('#re-roll-button');
const scoreButtonEl = document.querySelector('#keep-score-button');
const resetButtonEl = document.querySelector('#reset-button');
const diceEl = document.querySelector('.all-dice');
const singleDiceEl = document.querySelectorAll('.dice');
const messageBoxEl = document.querySelector('#message-box');
const score1 = document.querySelector('#player-1-score');
const score2 = document.querySelector('#player-2-score');
const wins1 = document.querySelector('#player-1-wins');
const wins2 = document.querySelector('#player-2-wins');

/* Functions and Game Logic */
const initialize = () => {
      currentPlayer = FIRST_PLAYER;
      isGameWon = false;
      isGamePaused = true;
      player1Score = 0;
      player2Score = 0;
      holdScore = 0;
      clearRoundScore();
      score1.innerText = player1Score;
      score2.innerText = player2Score;
      rollButtonEl.innerText = 'Roll the dice!';
      messageBoxEl.textContent = `${FIRST_PLAYER}, roll to start your turn!`;
      rollButtonEl.classList.remove("hidden");
      scoreButtonEl.classList.add("hidden");
      resetButtonEl.classList.add("hidden");
      reRollButtonEl.classList.add("hidden");
      clearOverlay();
      createUnClickedArray();
      createDiceValues();
}
const rollDice = () => {
      isGamePaused = false;
      messageBoxEl.textContent = `${currentPlayer}, please select your dice.`;
      rollButtonEl.classList.add("hidden");
      holdScore = 0;
      clearOverlay();
      createUnClickedArray();
      createDiceValues();
      updateUnClickedScore();
      clearRoundScore();
}
const createDiceValues = () => {
      diceValues.length = 0;
      let allDice = unClickedDice;
      for(let i = 0; i < allDice.length; i++) {
            randValue = Math.floor(Math.random() * 6) + 1;
            allDice[i].dataset.value = `${randValue}`;
            allDice[i].className = `dice dice-${randValue}`;
            diceValues.push(allDice[i]);
      }
}

// if each array is less than 3, give it gray class, which can't be clicked, but will be rerolled.





const updateUnClickedScore = () => {
      let unClickedDiceValues = [];
      for(let i = 0; i < unClickedDice.length; i++) {
            unClickedDiceValues.push(parseInt(unClickedDice[i].dataset.value));
      }
      let rolledOnes = unClickedDiceValues.filter(number => number === 1);
      console.log("rolledones", rolledOnes)
      let rolledTwos = unClickedDiceValues.filter(number => number === 2);
      console.log("rolledtwos", rolledTwos)
      let rolledThrees = unClickedDiceValues.filter(number => number === 3);
      console.log("rolledthrees", rolledThrees)
      let rolledFours = unClickedDiceValues.filter(number => number === 4);
      console.log("rolledfours", rolledFours)
      let rolledFives = unClickedDiceValues.filter(number => number === 5);
      console.log("rolledfives", rolledFives)
      let rolledSixes = unClickedDiceValues.filter(number => number === 6);
      console.log("rolledsixes", rolledSixes)
      let rolledStraight = unClickedDiceValues.sort(function(a, b){return a-b}).toString();
      console.log("rolledstraight", rolledStraight)
      if(rolledOnes.length < 3) {
            onesTotal = (rolledOnes.length * 100);
      } if(rolledOnes.length === 3) {
            threeOnes = 1000;
            onesTotal = 0;
      } if(rolledOnes.length === 4) {
            fourOnes = 1100;
      } if(rolledOnes.length === 5) {
            fiveOnes = 1200;
      } if(rolledTwos.length >= 3) {
            twosTotal = 200;
      } if(rolledThrees.length >= 3) {
            threesTotal = 300;
      } if(rolledFours.length >= 3) {
            foursTotal = 400;
      } if(rolledFives.length < 3) {
            fivesTotal = (rolledFives.length * 50);
      } if(rolledFives.length === 3) {
            threeFives = 500;
            fivesTotal = 0;
      } if(rolledFives.length === 4) {
            fourFives = 550;
      } if(rolledFives.length === 5) {
            fiveFives = 600;
      }if(rolledSixes.length >= 3) {
            sixesTotal = 600;
      }if(rolledStraight === "1,2,3,4,5") {
            largeStraight = 1500;
            onesTotal = 0;
            fivesTotal = 0;
      }
      let tempScore = onesTotal + twosTotal + threesTotal + foursTotal + fivesTotal + sixesTotal +threeOnes + fourOnes + fiveOnes + threeFives + fourFives + fiveFives + largeStraight;
      if(tempScore === 0) {
            if(currentPlayer === "Player 1") {
                  messageBoxEl.innerText = `${currentPlayer}, you rolled garbage and scored 0 points. It's now Player 2's turn.`;
                  rollButtonEl.classList.remove('hidden');
                  currentPlayer = "Player 2";
                  clearRoundScore();
                  freezeDice();
                  clickedDice = [];
                  isGamePaused = true;
                  reRollButtonEl.classList.add("hidden");
            } else {
                  messageBoxEl.innerText = `${currentPlayer}, you rolled garbage and scored 0 points. It's now Player 1's turn.`;
                  rollButtonEl.classList.remove('hidden');
                  currentPlayer = "Player 1";
                  clearRoundScore();
                  freezeDice();
                  clickedDice = [];
                  isGamePaused = true;
                  reRollButtonEl.classList.add("hidden");
            }
      } else {
            return;
      }
}
const updateClickScore = () => {
      let clickedDiceValues = [];
      for(let i = 0; i < clickedDice.length; i++) {
            clickedDiceValues.push(parseInt(clickedDice[i].dataset.value));
      }
      let rolledOnes = clickedDiceValues.filter(number => number === 1);
      let rolledTwos = clickedDiceValues.filter(number => number === 2);
      let rolledThrees = clickedDiceValues.filter(number => number === 3);
      let rolledFours = clickedDiceValues.filter(number => number === 4);
      let rolledFives = clickedDiceValues.filter(number => number === 5);
      let rolledSixes = clickedDiceValues.filter(number => number === 6);
      let rolledStraight = clickedDiceValues.sort(function(a, b){return a-b}).toString();
      if(rolledOnes.length < 3) {
            onesTotal = (rolledOnes.length * 100);
      } if(rolledOnes.length === 3) {
            threeOnes = 1000;
            onesTotal = 0;
      } if(rolledOnes.length === 4) {
            fourOnes = 1100;
      } if(rolledOnes.length === 5) {
            fiveOnes = 1200;
      } if(rolledTwos.length >= 3) {
            twosTotal = 200;
      } if(rolledThrees.length >= 3) {
            threesTotal = 300;
      } if(rolledFours.length >= 3) {
            foursTotal = 400;
      } if(rolledFives.length < 3) {
            fivesTotal = (rolledFives.length * 50);
      } if(rolledFives.length === 3) {
            threeFives = 500;
            fivesTotal = 0;
      } if(rolledFives.length === 4) {
            fourFives = 550;
      } if(rolledFives.length === 5) {
            fiveFives = 600;
      }if(rolledSixes.length >= 3) {
            sixesTotal = 600;
      }if(rolledStraight === "1,2,3,4,5") {
            largeStraight = 1500;
            onesTotal = 0;
            fivesTotal = 0;
      }
      let tempScore = onesTotal + twosTotal + threesTotal + foursTotal + fivesTotal + sixesTotal +threeOnes + fourOnes + fiveOnes + threeFives + fourFives + fiveFives + largeStraight;
      roundScore = holdScore + tempScore;
      messageBoxEl.innerText = `${currentPlayer}, you have selected ${clickedDice.length} dice. Your current round score is ${roundScore}.`;
      clearRoundScore();
}
const keepScore = () => {
      if(currentPlayer === 'Player 1') {
            if(roundScore >= 350 || player1Score >= 350) {
                  player1Score += roundScore;
                  score1.innerText = player1Score;
            }
      } else {
            if(roundScore >= 350 || player2Score >= 350) {
            player2Score += roundScore;
            score2.innerText = player2Score;
            }
      }
      freezeDice();
      holdScore = 0;
      clickedDice = [];
      checkForWin();
      isGamePaused = true;
      reRollButtonEl.classList.add("hidden");
}
const checkForWin = () => {
      if(player1Score >= 5000) {
            isGameWon = true;
            endGame();
      } else if(player2Score >= 5000) {
            isGameWon = true;
            endGame();
      } else {
            changePlayers();
            rollButtonEl.classList.remove("hidden");
            scoreButtonEl.classList.add("hidden");
      }
}
const clearRoundScore = () => {
      onesTotal = 0;
      twosTotal = 0;
      threesTotal = 0;
      foursTotal = 0;
      fivesTotal = 0;
      sixesTotal = 0;
      threeOnes = 0;
      fourOnes = 0;
      fiveOnes = 0;
      threeFives = 0;
      fourFives = 0;
      fiveFives = 0;
      largeStraight = 0;
}
const changePlayers = () => {
      if(currentPlayer === "Player 1") {
            currentPlayer = "Player 2";
            if(roundScore < 350 && player1Score < 350) {
                  messageBoxEl.textContent = `You need 350 points to get on the board. ${currentPlayer}, it's your turn!`;
            } else {
            messageBoxEl.textContent = `You added ${roundScore} points to your score. ${currentPlayer}, it's your turn!`;
            }
      } else if(currentPlayer === "Player 2") {
            currentPlayer = "Player 1";
            if(roundScore < 350 && player2Score < 350) {
                  messageBoxEl.textContent = `You need 350 points to get on the board. ${currentPlayer}, it's your turn!`;
            } else {
            messageBoxEl.textContent = `You added ${roundScore} points to your score. ${currentPlayer}, it's your turn!`;
            }
      }
      clearRoundScore();
}
const endGame = () => {
            messageBoxEl.textContent = `${currentPlayer}, you reached 5000 points! You win!`;
            rollButtonEl.classList.add("hidden");
            scoreButtonEl.classList.add("hidden");
            reRollButtonEl.classList.add("hidden")
            resetButtonEl.classList.remove("hidden");
            if(currentPlayer === "Player 1") {
                  player1Wins += 1;
                  wins1.innerText = player1Wins;
            } else {
                  player2Wins += 1;
                  wins2.innerText = player2Wins;
            }
}
const clickDice = (event) => {
      if(isGamePaused === true) return;
      let selectedDice = event.target;
      let clickedDiceIndex = clickedDice.indexOf(selectedDice);
      if(selectedDice.classList.contains("frozen")) return;
      if(selectedDice.classList.contains("gray")) return;
      if(clickedDice.includes(selectedDice) === false) {
            clickedDice.push(selectedDice);
      } else {
            clickedDice.splice(clickedDiceIndex, 1);
      }
      if(selectedDice.classList.contains('red')) {
            selectedDice.classList.remove('red');
      } else {
            if(selectedDice == diceEl) {
                  return;
            }
            selectedDice.classList.toggle('red');
            if(clickedDice.length > 0) {
                  scoreButtonEl.classList.remove("hidden");
            }
      }
      updateClickScore();
      unClickedDice = diceValues.filter(dice => !dice.classList.contains('red'));
      reRollButtonEl.classList.remove("hidden");
}
const clearOverlay = () => {
      for(let i = 0; i < singleDiceEl.length; i++) {
            if(singleDiceEl[i].classList.contains('red')) {
                  singleDiceEl[i].classList.remove('red');
            }
      }
}
const reRollDice = () => {
      isGamePaused = false;
      messageBoxEl.textContent = `${currentPlayer}, please select more dice.`;
      holdScore = roundScore;
      roundScore = 0;
      clearRoundScore();
      createDiceValues();
      reRollButtonEl.classList.add("hidden");
      scoreButtonEl.classList.add("hidden");
      freezeDice();
      clickedDice = []
      updateUnClickedScore();
}
const createUnClickedArray = () => {
      unClickedDice = [];
      for(let i = 0; i < diceEl.children.length; i++) {
            unClickedDice.push(diceEl.children[i]);
      }
}
const freezeDice = () => {
      for(let i = 0; i < clickedDice.length; i++) {
            if(clickedDice[i].classList.contains('red')) {
                  clickedDice[i].classList.remove('red');
                  clickedDice[i].classList.add('frozen');
            }
      }
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
rollButtonEl.addEventListener("click", rollDice);
reRollButtonEl.addEventListener("click", reRollDice);
scoreButtonEl.addEventListener("click", keepScore);
resetButtonEl.addEventListener("click", initialize);
diceEl.addEventListener("click", clickDice);

/*------Game End------*/

/*-----Roll Button-----*/

/*-----Keep Score Button-----*/

/*-----Player Score -----*/

/*-----Clicking Dice-----*/
// HARD: Should not be able to click dice to hold if they have no value
      // Dice should have value before they are clicked, so we can determine which dice to gray out
      // To gray out dice, for each dice, if they DON'T meet score conditionals, gray them out.
      // HARD: Make unvaluable dice unclickable (and gray them out), make valuable dice clickable
// MEDIUM: Add ability to re-roll and continue tabulating score after all 5 dice are clicked (reset clickedDice array)
      // When all 5 dice have value, add new button that says Keep Score and Roll again.








// if unclickabledice length === 0
// log holdscore
// clear clickeddice
// clear frozen class
// don't change players

// Dice sit in:
      // diceValues array (all dice)
      // class of dice (all dice)
      // class of dice-X (individual dice of same number)
      // individual dataset value (individual dice of same number)
      // class of red (dice divs of clicked dice)
      // clickedDice array (dice divs of clicked dice)
      // clickedDiceValues array (integer values of clicked dice)