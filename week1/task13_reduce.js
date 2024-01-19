const arr = [1, 2, 3, 4];
console.log(arr);

const result = arr.reduce((result, item) => result + item, 0); // 10
const result2 = arr.reduce((result, item) => result + item, 2); // 12
console.log(result);
console.log(result2);
