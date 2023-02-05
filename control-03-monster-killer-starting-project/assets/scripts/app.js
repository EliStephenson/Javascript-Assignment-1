const ATTACK_VALUE = 10; // how hard we can hit for a maximum the capitals indicate global variable generally
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;


adjustHealthBars(chosenMaxLife);

function attackMonster(attackMode) {
    let maxDamage;
    if (attackMode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (attackMode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { 
        alert('YOU WIN!')
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('YOU DIED')
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert('YOU HAVE DIED BUT TAKEN THE MONSTER WITH YOU')
    }
}


function attackHandler() { // event handler function for the attack feature
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)