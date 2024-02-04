// import multiply from './multiply.mjs';
const sum = require('./sum.cjs');

// To use the ES6 module first we have to set the type in package.json to module (By default it is commonJS)
// const mul = multiply(3, 4);
// console.log(mul);

const res = sum(3, 4);
console.log(res);
