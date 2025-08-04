import express from 'express';
// To database connection
import pool from './db.js';

import { supabase } from './supabase.js'; // Import supabase client if needed

const router = express.Router();

//Create a todo
router.post('/new', async(req, res) => {
    try {
        const { description, title, daily } = req.body;
        const userId = req.userId; // Get userId from the authenticated request

        // Insert new todo using PostgreSQL
        const newTodo = await pool.query(
            'INSERT INTO todos (title, description, daily, user_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, daily, userId, false]
        );

        if (newTodo.rows.length === 0) {
            return res.status(500).json({ error: 'Failed to create todo' });
        }

        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// Get all ToDos as JSON
router.get('/todos', async (req, res) => {

    try {
        const allTodos = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY completed ASC', [req.userId]);
        const todos = allTodos.rows;
        res.json(todos);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// UPDATE a ToDo
router.put('/edit/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const {title, description, daily, completed} = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const upadateTodo = await pool.query("UPDATE todos SET title = $1 , description = $2, daily = $3, completed = $4 WHERE id = $5  RETURNING *",[title, description, daily,completed,id]
            
        );
        
        res.json("ToDo was updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE a ToDo
router.delete('/del/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const userId = req.userId; // Get the user ID from the request object
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' }); // Handle case where user ID is not found
        }
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2  RETURNING *', [id, userId]);
        if (deleteTodo.rowCount === 0) {
            return res.status(404).json({ error: 'Todo not found' }); // Handle case where no rows are deleted
        }
        
        res.json("ToDo was deleted");
    } catch (err) {
        console.error(err.message);
        
    }
});

export default router;