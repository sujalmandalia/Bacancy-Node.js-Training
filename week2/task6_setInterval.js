/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
let intervalId;
startBtn = document.getElementById('start');

startBtn.addEventListener('click', startFunction);

function printText() {
  // console.log('hi');
  const para = document.createElement('p');
  const node = document.createTextNode('Hello');
  para.appendChild(node);
  const element = document.getElementById('div1');
  element.appendChild(para);
}

function startFunction() {
  intervalId = setInterval(printText, 1000);
}

stopBtn = document.getElementById('stop');

stopBtn.addEventListener('click', stopFunction);

function stopFunction() {
  clearInterval(intervalId);
}
