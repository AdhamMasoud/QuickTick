const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(express.json());
//API

//Create a todo
app.post('/todos', async(req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        console.log(req.body.title);
        const { title } = req.body;
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todos (title,description) VALUES($1,$2) RETURNING *", [title,description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});





app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    try {
        console.log('Server running on port 5000');
    } catch (err) {
        console.error(err.message);
    }
});