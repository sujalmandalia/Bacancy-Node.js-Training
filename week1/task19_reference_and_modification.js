const originalObject = {
  name: 'Sujal',
  state: 'Ahmedabad'
}

// const modifiedObject = {
//   name : "Raj",
//   state : "Maharashtra"
// }

// modifiedObject.name = "Rohan"
//console.log(modifiedObject); // change in modifiedObject
//console.log(originalObject); // no change in the original object

const modifiedObject = originalObject;

modifiedObject.name = 'Prayag'
console.log(originalObject);// will change in as the reference is the same
console.log(modifiedObject);
