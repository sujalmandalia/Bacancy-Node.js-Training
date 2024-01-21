const book = {
  title : "Transcendence",
  author : "APJ Abdul Kalam",
  pages : 2000, 
  dispalyInfo(){
    console.log(`Book name is ${this.title} whose author is ${this.author} and it contains ${this.pages}`);
  }
}

book.dispalyInfo();