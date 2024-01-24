// using Bind method
const multipy = function (x, y) {
  return x * y;
};

// 1st way
// let multiplyByTwo = multipy.bind(this, 2, 3);// it will take x = 2 and y = 3
// console.log(multiplyByTwo());

// 2nd Way
const multiplyByTwo = multipy.bind(this, 2); // x = 2
console.log(multiplyByTwo(3)); // y= 3

// Using Function Closures

function mul(x, y) {
  return function (y) {
    return x * y;
  };
}

const multiplyByFive = mul(5);
console.log(multiplyByFive(10));
