function Car(name, brand, year) {
  this.nameee = name;
  this.brandName = brand;
  this.year = year;
  this.displayInfo = function () {
    console.log(`${name} car is of ${this.brandName} brand and of ${year}`);
  };
}

// if parameter name and prorperty name is same then we don't need to use this but if both are different then we should use this

const c1 = new Car('Creta', 'Hyundai', 2015);
c1.displayInfo();
