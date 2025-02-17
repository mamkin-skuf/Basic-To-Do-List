const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());



let todos = [];
let idCounter = 1;

// Get all to-dos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single to-do by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'To-Do not found' });
    }
    res.json(todo);
});

// Create a new to-do
app.post('/todos', (req, res) => {
    const { task, completed } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: idCounter++, task, completed: completed || false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a to-do by ID
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'To-Do not found' });
    }
    const { task, completed } = req.body;
    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

// Delete a to-do by ID
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'To-Do not found' });
    }
    todos.splice(todoIndex, 1);
    res.json({ message: 'To-Do deleted successfully' });
});

app.listen(port, () => {
    console.log(`To-Do List API running on http://localhost:${port}`);
});
