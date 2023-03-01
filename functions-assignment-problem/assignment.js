const sayHello = (name) => {
  console.log('Hi...' + name);
}

sayHello('Eli');


const sayHello1 = (name1, greeting1) => {
  console.log(greeting1 + name1);
}

sayHello1('Eli', 'Howdy ');

const sayHello2 = () => {
  console.log('Hi ' + 'Eli');
}
 sayHello2();

const sayHello3 = (name3 = 'mairin', greeting3 = 'hola ') => greeting3 + name3;
console.log(sayHello3('Eli', 'Hello '));
console.log(sayHello3())

const checkInput  = (callitback, ...inputs) => {
  let hasEmptyText = false;
  for (const text of inputs) {
    if (!text) {
      hasEmptyText = true;
      break;
    }
  }
  if (!hasEmptyText) {
    callitback();
  }
}

checkInput(
  () => {
    console.log('all not empty');
  },
  'hello', 'my','name', 'is', 'sef'
  );
  