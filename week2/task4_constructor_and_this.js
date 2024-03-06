function Car(name, brand, year) {
  this.name = name;
  this.brandName = brand;
  this.year = year;
  this.displayInfo = function () {
    console.log(`${this.name} car is of ${this.brandName} brand and of ${this.year}`);
  };
}

// if parameter name and prorperty name is same then we don't need to use this but if both are different then we should use this

const c1 = new Car('Creta', 'Hyundai', 2015);
c1.displayInfo();
