/* eslint-disable prefer-const */
let age = 21;
let name = 'Sujal';
let isStudent = true;

console.log(typeof age);

let ageStr = age.toString();

console.log(typeof ageStr);
console.log(typeof name);
console.log(typeof isStudent);

let greet = 'Hello';

let msg = greet.concat(' '+name); // using concat method of String
console.log(msg);

let result = `${msg} ${ageStr} years old ${isStudent ? 'is a Student' : 'is not a Student'}`;
console.log(result);
