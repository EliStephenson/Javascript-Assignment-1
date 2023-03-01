const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WINS';
const RESULT_COMPUTER_WIN = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK},${PAPER} or ${SCISSORS}?`,
    ''
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    // wont kick in because its checkde after and there is a return
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WIN
    : RESULT_COMPUTER_WIN;

startGameBtn.addEventListener('click', () => { // ADDES CAllback function for the event listener called for you by something else
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if (playerChoice) {
    const winner = getWinner(computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice); // this does not throw an error even though only giving one argument (will use undefined for missing arguments)
  }
  let message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice},therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + 'had a draw.';
  } else if (winner === RESULT_PLAYER_WIN) {
    message = message + 'won.';
  } else {
    message = message + 'lost.';
  }
  alert(message);
  gameIsRunning = false;
}); // name just used for debugging (give anonymous functions a name)

// not related to the game (assume calling dynamically with any numb of arguments )

// const sumUp = (numbers) => {
//     let sum = 0;
//     for (const num of numbers) {
//         sum += num;
//     }
//     return sum;
// } ;

// console.log(sumUp([1,5,10,-3,6,10,25,88]));

// to do somthing like this we can use a rest operator so that we can put in arguments instead of arrays 

const sumUp = (resultHandler, ...numbers) => {  // ... takes all arguments and builds an array inside of a funciton
    const validateNumber = (number) => { // this function is only inside of another function
        return isNaN(number) ? 0 : number;
    };

    let sum = 0;
    for (const num of numbers) {
        sum += num;

    }
    resultHandler(sum);
};
//sumUp(showResult,1,5,10,-3,6,10,25,88);
 // rest operator must always be last in the list 
// show result is a callback funciton to execute the funciton when something happens 

const subtractUp = function() {
    let sum = 0;
    for (const num of arguments) { // arguments is built into javascript this will merge into array like the rest operator
        sum -= num;
    }
        return sum;
    
};

const showResult = (result) => {
    alert('the result after adding all numebers is ' + result);
};

sumUp(showResult,1,5,10,-3,6,10,25,88);