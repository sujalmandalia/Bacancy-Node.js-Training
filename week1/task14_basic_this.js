const person = {
  name: 'Sujal',
  age: 21,
  introduce() {
    console.log(`Hello ${this.name}`);
  },
};

person.introduce();

// With Arrow function

const person2 = {
  name: 'Sujal',
  age: 21,
  introduce(){
    const y = () => {
      console.log(`hello ${this.name} from arrow function`);
    };
    y();
  }
};

person2.introduce();
