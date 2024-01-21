const originalPerson = {
  name: 'Sujal',
  age: 21,
  hobbies: ['Cricket', 'music', 'dancing']
}

//shallowCopy

// method 1
const shallowCopyPerson1 = originalPerson;
shallowCopyPerson1.hobbies[2] = 'Running';
console.log(originalPerson.hobbies); // will change the original

// method2
const shallowCopyPerson2 =  Object.assign({},originalPerson);// can also be done using object Spread
shallowCopyPerson2.hobbies[0] = 'Public Speaking';
shallowCopyPerson2.name = 'rajiv'
console.log(originalPerson.name);// will not Change
console.log(originalPerson.hobbies);// will change as deep copy is not done

// Deep Copy

const deepCopyPerson = structuredClone(originalPerson);
console.log(deepCopyPerson);
deepCopyPerson.hobbies[1] = 'Reading';
console.log(deepCopyPerson);
console.log(originalPerson); // will not change
