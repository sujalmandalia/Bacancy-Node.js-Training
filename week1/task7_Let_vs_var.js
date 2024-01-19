/* eslint-disable no-use-before-define */
/* eslint-disable vars-on-top */
/* eslint-disable no-console */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-var */
var a = 100;
console.log(a);// 100

let b = 200;
console.log(b); //200

{
  var a = 300;
  console.log(a);//300

  let b = 4000
  console.log(b);//4000
}

console.log(a);//300

// Var is stored in global space so even if we have made change in var variable inside a block scope still it is reflected outside the scope

// Let are  block-scope so changes made in the block scope are not reflected in th global space
console.log(b);//200

// FUNCTIONAL SCOPE

function x() {
  var b = 10;
  c();
  function c() {
    console.log(b);// 10
  }
}
x();
// The inner function c here searches for th value of b in it's lexical scope (Parent Scope)