const magicFunction = function (a) {
  return function (b) {
    if (b) {
      return magicFunction(a + b);
    }
    return a;
  };
};

console.log(magicFunction(2)(3)(4)(5)());
