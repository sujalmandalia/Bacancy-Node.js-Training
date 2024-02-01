const fs = require('fs');

const data = fs.readFileSync('1.txt');
console.log(data.toString()); // 1

setTimeout(() => {
  console.log('Inside Timeout 1');  // 4
}, 0);

new Promise((resolve, reject) => {
  resolve('Promise Resolved');
}).then((data) => {
  console.log(data); // 3
});

setTimeout(() => {
  console.log('Inside Timeout 2');
}, 1000); // 4

console.log("Sujal"); // 5
