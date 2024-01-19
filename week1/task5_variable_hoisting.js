/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */

console.log(a);// undefined
var a = 10;
console.log(a);// 10

// first console is giving output as undefined because in js the execution of the program is done in two phases
// 1 --> Memory Creation Phase
// 2 --> Execution phase

// In memeory creation phase memory is assigned to var a but it is intialized with the value undefined
// so When we access the var before it's intialization it will print undefined

// In execution phase the value 10 is assigned to the var a so after declarations when we try to console the value of a it will print 10

// console.log(b); // ReferenceError
let b = 20;
console.log(b); // 20

// In case of let in memory creation phase memory is assigned to them but they are not stored in the global space , they are in stored in some special memory space

// So when we try to access the let variables before declarations we get reference error
// let variables are hoisted but they behave differently as there is a concept of temporal dead zone in them
// After declarations let variables will return the assigned value i.e. 20
