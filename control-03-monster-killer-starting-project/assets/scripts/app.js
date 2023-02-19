const ATTACK_VALUE = 10; // how hard we can hit for a maximum the capitals indicate global variable generally
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;

const LIGHT_ATTACK = 'ATTACK';
const STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_END_GAME = 'END_GAME';

let battleLog = [];

function getMaxLifeValues() {
  const enteredNumber = prompt('Maximum Life for you and the monster', '100');

  const parsedValue = parseInt(enteredNumber);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    // checks if the above value wasnt a number and couldnt become and int
    //chosenMaxLife = 100; // 100 is the defualt value if prompt doesnt yeild an acceptable value
    throw {message: 'Invalied user input. Not a number'};
  }
  return parsedValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('You entered invalid date, defaultvalue of 100 used');
  throw error; // rethrow error if you want it in an analytic system/server
} finally { // finally executes everytime not always needed tho
  // dont need this but its good for reference
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true; //typical naming convention for a boolean val

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_END_GAME:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }

  //   if (event === LOG_EVENT_PLAYER_ATTACK) {
  //     logEntry.target = 'MONSTER';
  //   } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'MONSTER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHealth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'PLAYER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHealth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: 'PLAYER',
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHealth: playerHealth,
  //     };
  //   } else if (event === LOG_EVENT_END_GAME) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       finalMonsterHealth: monsterHealth,
  //       finalPlayerHealth: playerHealth,
  //     };

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    // could do hasBonusLife === true but just the name works for booleans cause it checks if true for the condition
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('bonus life used, be more careful');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WIN!');
    writeToLog(
      LOG_EVENT_END_GAME,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('YOU DIED');
    writeToLog(
      LOG_EVENT_END_GAME,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('YOU HAVE DIED BUT TAKEN THE MONSTER WITH YOU');
    writeToLog(
      LOG_EVENT_END_GAME,
      'DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(attackMode) {
  const maxDamage =
    attackMode === LIGHT_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE; // use of ternarry operator instead of if statement (doesnt work as well for more complex conditions)
  const logEvent =
    attackMode === LIGHT_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK; // saves some code and uses constants
  //   if (attackMode === LIGHT_ATTACK) {
  //     maxDamage = ATTACK_VALUE;
  //     logEvent = LOG_EVENT_PLAYER_ATTACK;
  //   } else if (attackMode === STRONG_ATTACK) {
  //     maxDamage = STRONG_ATTACK_VALUE;
  //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  //   }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  // event handler function for the attack feature
  attackMonster(LIGHT_ATTACK);
}

function strongAttackHandler() {
  attackMonster(STRONG_ATTACK);
}

function healPlayerHandler() {
  let healVal;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than max health");
    healVal = chosenMaxLife - currentPlayerHealth;
  } else {
    healVal = HEAL_VALUE;
  }
  increasePlayerHealth(healVal); //updates health bar but not health value
  currentPlayerHealth += healVal; //adds numerical health
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healVal,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('--------');
  }
  let j = 0;
  outerWhile: do { //making a labeled statement for the loop 
    console.log('outer',j);
    innerFor: for(let k=0; k<5; k++){
      if (k === 3) {
        break outerWhile; // allows us to break a different loop than the one that we are currently in
        //continue outerWhile; // dangerous because it creates an infinite loop
      }
      console.log('inner',k);
    }
    j++;
  } while (j < 3);
  //can also decrement for loops
  //   for (let i = 0; i < battleLog.length; i++) {
  //     console.log(battleLog[i]);
  //   }
  let i = 0
  for (const logElement of battleLog) { // for-of loop
    // use const because it is making a new one everytime
    //console.log(logElement); // for for of loop
    console.log(`#${i}`);
    for (const key in logElement){
        console.log(`${key} => ${logElement[key]}`);
        console.log(key); //logs name of property
        console.log(logElement[key]); // logs value
    }
    i++
    //goes through array and accesses element but does not give us the index we would need to code something for this if necessary (for-of)
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
