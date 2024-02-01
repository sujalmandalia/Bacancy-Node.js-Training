/* eslint-disable no-unused-vars */
const fs = require('fs');

try {
  const data = fs.readFileSync('1.txt');
  console.log(data.toString()); // 1
} catch (error) {
  console.log('Error', error);
}

setTimeout(() => {
  console.log('Inside Timeout 1'); // 4
}, 0);

new Promise((resolve, reject) => {
  resolve('Promise Resolved');
}).then((data) => {
  console.log(data); // 3
});

setTimeout(() => {
  console.log('Inside Timeout 2');
}, 1000); // 4

console.log('Sujal'); // 2
