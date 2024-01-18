for (let i = 1; i <= 3; i += 1) {
  console.log(`Outer loop :${i}`);
  for (let j = 1; j <= 5; j += 1) {
    console.log(`Inner Loop : ${j}`);
    if (i === j) {
      break;
    }
  }
}
