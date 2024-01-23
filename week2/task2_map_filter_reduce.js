// Using Map Filter Chaining
const students = [
  { name: 'jeel', age: 20 },
  { name: 'anjali', age: 25 },
  { name: 'ram', age: 10 },
];

const res = students.filter((x) => x.age > 18).map((x) => x.name);
console.log(res);

// using reduce
const output = students.reduce((acc, curr) => {
  if (curr.age > 18) {
    acc.push(curr.name);
  }
  return acc;
}, []);

console.log(output);
