/* eslint-disable no-console */
const list = ['Apple', 'Banana', 'Watermelon', 'Orange', 'Kiwi'];

for (let i = 0; i < list.length; i += 1) {
  const len = list[i].length;
  if (len > 8) {
    break;
  }
  const charArr = list[i].split('');
  charArr.forEach((char, index) => {
    if (index === len - 1) {
      console.log(`${list[i]}!`);
    }
  });
}
