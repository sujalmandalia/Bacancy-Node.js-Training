/* eslint-disable indent */
const calculator = {
  x: 5,
  y: 3,
  calculate(op) {
    const y = () => {
      switch (op) {
        case 'add': console.log(this.x + this.y);
          break;
        case 'subtract': console.log(this.x - this.y);
          break;
        case 'multiply': console.log(this.x * this.y);
          break;
        case 'divide': console.log(this.x / this.y);
          break;
        default: console.log('Enter valid operator');
          break;
      }
    };
    y();
  }
};

calculator.calculate('multiply');
