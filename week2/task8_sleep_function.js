/* eslint-disable no-await-in-loop */
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise is resolved');
  }, 5000);
});

async function sleep() {
  for (let i = 0; i < 5; i += 1) {
    console.log(i);
    const res = await p;
  }
}
sleep();

// this function will make the loop stop for the till the promise is resolved
// It will print 0 and wait for promise to be resolved and will print rest of the values