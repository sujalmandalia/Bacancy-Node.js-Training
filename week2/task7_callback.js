const arr = [1, 2, 3, 4];
console.log(arr);

const addWithTwo = function (x) {
  return x + 2;
};

function newArray(arr, cb) {
  const result = [];
  arr.forEach((element) => {
    result.push(cb(element));
  });
  return result;
}

console.log(newArray(arr, addWithTwo));
