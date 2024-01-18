/* eslint-disable no-console */
/* eslint-disable no-continue */
const arr = [1, 2, 3, 4, 5, 15];

for (let i = 0; i < arr.length; i += 1) {
  console.log(arr[i]);
  if (arr[i] > 5) {
    break;
  }
  if (arr[i] === 3) {
    continue;
  }
  console.log(arr[i]);
}
