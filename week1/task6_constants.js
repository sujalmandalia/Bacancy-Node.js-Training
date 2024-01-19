// const e ;// Will give SyntaxError (Missing intailizer in const declaration)

console.log(a);// ReferenceError
// Const variables are hoisted but they behave differntly than var as there is a concept of temporal dead zone in const

const a = 20;
// a = 30;
// Will give TypeError as we are trying to reassign values to the constant variabales
console.log(a);// 20

{
  // a = 60; // TypeError
  const a = 40
  console.log(a);// 40
  // This is allowed as const are declared in a separate block space
}
// const are generaaly suitable for use in the cases where there will be no updation in the assigned value 
// they are mostly used in function expressions