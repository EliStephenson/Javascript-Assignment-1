const ATTACK_VALUE = 10; // how hard we can hit for a maximum the capitals indicate global variable generally
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WIN!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('YOU DIED');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('YOU HAVE DIED BUT TAKEN THE MONSTER WITH YOU');
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
