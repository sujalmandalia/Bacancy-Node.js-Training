/* eslint-disable no-console */
/* eslint-disable spaced-comment */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
var a = 10;
let b = 100;
const c = 1000;

// c = 40 will give TypeError as reassignment to the constant variable is not possible

let d;// allowed
console.log(d);// undefined
d = 50;
console.log(d);//50

// const e ;
// will give SyntaxError as const should always be intialized with a value

console.log(a); //10
console.log(b); //100
console.log(c); //1000

{
  var a = 20;
  let b = 200;
  const c = 2000;

  console.log(a);//20
  console.log(b);//200
  console.log(c);//2000
}

// var is global scoped variable so change in the var variable in the block is also reflected outside the scope also
console.log(a);//20

// let and const are block scoped so change in them in the block scope is not reflected outside the block
console.log(b);//100
console.log(c);//1000
