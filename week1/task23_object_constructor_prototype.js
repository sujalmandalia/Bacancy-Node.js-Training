function Person(name, age){
  this.name = name;
  this.age = age;
  this.greet = function(){
    console.log(`Hello ${name}`);
  }
}

const p1 = new Person('Sujal', 21);
const p2 = new Person('Rohan', 23);

p1.greet();
console.log(p1.age);

p2.greet();
console.log(p2.age);
