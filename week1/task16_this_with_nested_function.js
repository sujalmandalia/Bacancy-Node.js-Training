function Car(brand) {
  this.brand = brand;
  this.carInfo = {
    displayInfo: (price) => {
      console.log(`Price of ${this.brand} is ${price}`);
    }
  }
}

const c1 = new Car('Toyota');
console.log(c1.brand);
c1.carInfo.displayInfo(20);

