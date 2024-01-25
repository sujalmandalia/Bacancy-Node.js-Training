/* eslint-disable no-undef */
function display(param) {
  const para = document.createElement('p');
  const node = document.createTextNode(param);
  para.appendChild(node);
  const element = document.getElementById('div1');
  element.appendChild(para);
}
async function getData() {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const res = await data.json();
    display(`userId : ${res.userId}`);
    display(`id : ${res.id}`);
    display(`title : ${res.title}`);
    display(`completed : ${res.completed}`);
  } catch (error) {
    console.log('Error', error);
  }
}

getData();
