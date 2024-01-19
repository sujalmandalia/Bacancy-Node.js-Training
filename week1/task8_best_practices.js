var a = 100;
let b = 200;
const c = 300;

console.log(a);
console.log(b);
console.log(c);

{
  var a = 400;
  let b = 500;
  const c = 600;

  console.log(a);
  console.log(b);
  console.log(c);
}

console.log(a);
console.log(b);
console.log(c);

// Best Practice for variable Declaration :

let y = 10;
const z = 50;

// Always let or const should be used for variable declarations as vraiables declared with var keyword are stored in the global space , so chnage in them will be reflected in the global ,memory

// Const should be used in the cases where there is no urther updation in the assigned value
// Const varaiable should always be intialized with a value

const d = 100;
// d = 200; // will give TypeError

console.log(msg); // undefined
var msg = "Hello"; 

// Best Practices For Hoisting :

// In case of hoisting of var variables it will give output as undefined

// console.log(e); // will give referenceError
let e = 10;
e = 5;
console.log(e);// best practice to shrink TDZ

// console.log(x); // will give referenceError
const x = 10;
console.log(x); // will Shrink TDZ to zero
// All the declaration should be done at the top
// In case of let and const we should try to sink the Temporal Dead Zone by making all the declarations at the top
