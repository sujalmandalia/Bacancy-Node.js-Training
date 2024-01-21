document.getElementById("myButton").addEventListener("click",myFunction);

function myFunction(){
  function normal(){
    console.log(this.textContent);
  }
  normal();

  const arrow = ()=>{
    console.log(`From arrow function ${this.textContent}`);
  }
  arrow();
}
