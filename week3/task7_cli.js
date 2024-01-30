const args = process.argv.slice(2);
// console.log(args);
let result;

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

console.log(result);
