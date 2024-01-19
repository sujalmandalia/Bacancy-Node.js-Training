const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
console.log(days);

days.pop(); // will last element of the array
console.log(days);

days.shift(); // will remove the first element of the array
console.log(days);

days.unshift('Sunday');// inserts new element at the start of the array
console.log(days);

days.push('Saturday');// inserts element at the end of the array
console.log(days);

console.log(days.indexOf('Wednesday'));
