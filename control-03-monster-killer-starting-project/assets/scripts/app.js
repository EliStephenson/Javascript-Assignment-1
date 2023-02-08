const ATTACK_VALUE = 10; // how hard we can hit for a maximum the capitals indicate global variable generally
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 20;
const HEAL_VALUE = 10;

const enteredNumber = prompt('Maximum Life for you and the monster', '100');


let chosenMaxLife = parseInt(enteredNumber);

if (isNaN(chosenMaxLife) || chosenMaxLife<= 0){ // checks if the above value wasnt a number and couldnt become and int
    chosenMaxLife = 100; // 100 is the defualt value if prompt doesnt yeild an acceptable value
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true; //typical naming convention for a boolean val

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

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
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('YOU DIED');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('YOU HAVE DIED BUT TAKEN THE MONSTER WITH YOU');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <=0){
    reset();
  }

}

function attackMonster(attackMode) {
  let maxDamage;
  if (attackMode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (attackMode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  // event handler function for the attack feature
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
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
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
