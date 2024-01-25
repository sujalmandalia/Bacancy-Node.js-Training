/* eslint-disable no-undef */
function display(param) {
  const para = document.createElement('p');
  const node = document.createTextNode(param);
  para.appendChild(node);
  const element = document.getElementById('div1');
  element.appendChild(para);
}
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((res) => {
    display(`userId : ${res.userId}`);
    display(`id : ${res.id}`);
    display(`title : ${res.title}`);
    display(`completed : ${res.completed}`);
  })
  .catch((error) => {
    console.log('Error', error);
  })
  .finally(() => {
    console.log('Promise is consumed');
  });
