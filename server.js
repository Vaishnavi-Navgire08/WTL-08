
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [
    { id: 1, name: 'Vaishnavi', email: 'vaishnavi@gmail.com', course: 'Computer Engineering' },
    { id: 2, name: 'Rahul', email: 'rahul@gmail.com', course: 'IT' }
];

let nextId = 3;

// Basic JSON route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to Student Management API' });
});

// GET all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// POST a student
app.post('/api/students', (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: 'Name, email and course are required'
        });
    }

    const student = { id: nextId++, name, email, course };
    students.push(student);

    res.status(201).json({
        message: 'Student added successfully',
        student
    });
});

// PUT update student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === Number(req.params.id));

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: 'Name, email and course are required'
        });
    }

    student.name = name;
    student.email = email;
    student.course = course;

    res.json({ message: 'Student updated successfully', student });
});

// DELETE student
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const deleted = students.splice(index, 1)[0];

    res.json({ message: 'Student deleted successfully', student: deleted });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
