/* eslint-disable indent */
const args = process.argv.slice(2);
// console.log(args);
let result;
if (isNaN(args[0]) || isNaN(args[1])) {
  result = 'Enter Valid Operand';
} else {
  switch (args[2]) {
    case '+':
      result = Number(args[0]) + Number(args[1]);
      break;
    case '-':
      result = Number(args[0]) - Number(args[1]);
      break;
    case '*':
      result = Number(args[0]) * Number(args[1]);
      break;
    case '/':
      result = Number(args[0]) / Number(args[1]);
      break;
    default:
      result = 'Invalid Operator';
      break;
  }
}
console.log(result);
