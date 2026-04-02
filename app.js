const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let students = [
  { id: 1, name: 'Arjun Sharma', age: 20, course: 'Computer Science' },
  { id: 2, name: 'Priya Reddy',  age: 22, course: 'Electronics'      },
  { id: 3, name: 'Rahul Verma',  age: 21, course: 'Mechanical Eng.'  },
];
let nextId = 4;

// Show homepage
app.get('/', (req, res) => {
  res.render('index', { students: students });
});

// Show Add form
app.get('/add', (req, res) => {
  res.render('add');
});

// Handle Add form
app.post('/add', (req, res) => {
  const newStudent = {
    id:     nextId,
    name:   req.body.name,
    age:    parseInt(req.body.age),
    course: req.body.course,
  };
  students.push(newStudent);
  nextId = nextId + 1;
  res.redirect('/');
});

// Show Edit form
app.get('/edit/:id', (req, res) => {
  const id      = parseInt(req.params.id);
  const student = students.find(function(s) { return s.id === id; });
  res.render('edit', { student: student });
});

// Handle Edit form
app.post('/edit/:id', (req, res) => {
  const id    = parseInt(req.params.id);
  const index = students.findIndex(function(s) { return s.id === id; });
  students[index].name   = req.body.name;
  students[index].age    = parseInt(req.body.age);
  students[index].course = req.body.course;
  res.redirect('/');
});

// Handle Delete
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(function(s) { return s.id !== id; });
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});