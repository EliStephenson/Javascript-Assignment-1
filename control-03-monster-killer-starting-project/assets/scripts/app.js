const ATTACK_VALUE = 10; // how hard we can hit for a maximum the capitals indicate global variable generally
const MONSTER_ATTACK_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;


adjustHealthBars(chosenMaxLife);

function attackHandler() { // event handler function for the attack feature
    const damage = dealMonsterDamage(ATTACK_VALUE);
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

function strongAttackHandler() {
    
}

attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click')
