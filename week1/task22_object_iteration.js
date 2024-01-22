const student = {
  name: 'Sujal',
  age: 21,
  grades: [89, 56, 78, 90, 56, 77],
  calculateAverage() {
    const result = this.grades.reduce((result, item) => result + item, 0);
    console.log(result / this.grades.length);
  }
}

student.calculateAverage();
for (const key in student) {
  console.log(`${key} : ${student[key]}`);
}