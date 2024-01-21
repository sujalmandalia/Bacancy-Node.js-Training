/* eslint-disable brace-style */
const user1 = {
  name: 'Sujal',
  state: 'Ahmedabad',
};

const user2 = {
  name: 'Mukesh',
  state: 'Rajasthan',
  //age: 20
};

function compareObjects() {
  const k1 = Object.keys(user1);
  const k2 = Object.keys(user2);
  if (k1.length !== k2.length) {
    return 'Objects are not equal based on the properties count'
  }
  else {
    for (let i = 0; i < k1.length; i++) {
      if (k1[i] !== k2[i])
        return "Objects are not equal based on the properties "
    }
    return 'Objects are equal based on properties'
  }
}
console.log(compareObjects());