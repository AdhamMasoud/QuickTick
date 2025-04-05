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
// Get all ToDos
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})
// Get a ToDo
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);

        if (!todo.rows.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// UPDATE a ToDo
app.put('/todos', async(req,res) => {
    try{
        const {id} = req.params;
        const {title, description} = req.body;
        const upadateTodo = await pool.query("UPDATE todos SET title = $1 AND description = $2 WHERE id = $3",[title, description, id]
        );
        res.json("ToDo was updated");
    } catch (err) {
        console.log(err.message);
    }
});

// DELETE a ToDo
app.delete('/todos', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);

        res.json("ToDo was deleted");
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