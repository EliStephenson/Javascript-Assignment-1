const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

// if (randomNumber > 0.7){
//     alert("the number is greater than 0.7");
// }

let numArray = [2,4,6,8,10,12];
for (let i = numArray.length; i >= 0; i--){
    console.log(numArray[i]);
}

for (const arrayEntry of numArray) {
    console.log(arrayEntry);
}

// const randNum2 = [Math.random(), Math.random()];
// if (randNum2[0] && randNum2[1] > 0.7 || randNum2[0]<0.2 || randNum2[1]<0.2) {
//     alert("both numbers are greater than 0.7 or one of the numbers is less than 0.2")

// }

const randNum2 = [Math.random(), Math.random()];
if (randNum2[0] && randNum2[1] > 0.7) {
    alert("both numbers are greater than 0.7 ")
} else if ( randNum2[0]<0.2 || randNum2[1]<0.2 ){
alert(" one of the number is less than 0.2")
}

