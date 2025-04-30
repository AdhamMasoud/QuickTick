import express from 'express';
// To database connection
import pool from './db.js'

const router = express.Router();

//Create a todo
router.post('/new', async(req, res) => {
    try{
        const {description, title, userId} = req.body;
        
        const newTodo = await pool.query("INSERT INTO todos (title, description, user_id) VALUES ($1, $2,$3) RETURNING *",
        [title, description, userId]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all ToDos as JSON
router.get('/todos', async (req, res) => {

    try {
        const allTodos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [req.userId]);
        if (allTodos.rows.length === 0) {
            return res.status(404).json({ error: 'No todos found' }); // Handle case where no todos are found
        }
        const todos = allTodos.rows;
        console.log(req.userId);
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
        const {title, description} = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const upadateTodo = await pool.query("UPDATE todos SET title = $1 , description = $2 WHERE id = $3",[title, description,id]
            
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
        const {user_id} = req.query; // Get the user ID from the request object
        if (!user_id) {
            return res.status(401).json({ error: 'Unauthorized' }); // Handle case where user ID is not found
        }
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2  RETURNING *', [id, user_id]);
        if (deleteTodo.rowCount === 0) {
            return res.status(404).json({ error: 'Todo not found' }); // Handle case where no rows are deleted
        }
        
        res.json("ToDo was deleted");
    } catch (err) {
        console.error(err.message);
        
    }
});

export default router;