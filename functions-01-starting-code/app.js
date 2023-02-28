const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WINS';
const RESULT_COMPUTER_WIN = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = function() {
    const selection = prompt(`${ROCK},${PAPER} or ${SCISSORS}?`,'').toUpperCase();
    if (selection !== ROCK &&
        selection !== PAPER &&
        selection !== SCISSORS
    ) {
        alert(`Invalid choice! We chose ${Rock} for you!`);
        return DEFAULT_USER_CHOICE
    }
    return selection;
};

const getComputerChoice = function() {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) { // wont kick in because its checkde after and there is a return
    return PAPER;
    } else { 
    return SCISSORS;
}
} ; 

const getWinner = function(cChoice, pChoice) {
    if (cChoice === pChoice) {
        return RESULT_DRAW;
    } else if (cChoice === ROCK && pChoice === PAPER || 
               cChoice === PAPER && pChoice === SCISSORS ||
               cChoice === SCISSORS && pChoice === ROCK ) 
    {
        return RESULT_PLAYER_WIN;
    } else {
        return RESULT_COMPUTER_WIN;
    }
};



startGameBtn.addEventListener('click', function startGame() {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice)
    console.log(winner)
}); // name just used for debugging (give anonymous functions a name)