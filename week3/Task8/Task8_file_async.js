const fs = require('fs');

// In async mode the file is being read in async mode so it will not  wait for the data to be fetched It will continue its execution and when the data is fetched it will run its callback

fs.readFile('1.txt', (err, data) => {
  if (err) {
    console.log('Error', err);
  }
  console.log(data.toString());// 4
});

setTimeout(() => {
  console.log('Inside Timeout 1'); // 3
}, 0);

new Promise((resolve, reject) => {
  resolve('Promise Resolved');
}).then((data) => {
  console.log(data); // 2
});

setTimeout(() => {
  console.log('Inside Timeout 2');// 5
}, 1000);

console.log('Sujal'); // 1
