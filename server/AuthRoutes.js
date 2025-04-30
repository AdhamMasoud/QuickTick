import express from 'express';
// To database connection
import pool from './db.js'
// bcrypt for password hashing
import bcrypt from 'bcrypt';
// jsonwebtoken for token generation
import jwt from 'jsonwebtoken';

const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const HashPassword = bcrypt.hashSync(password, 8); // In a real application, you should hash the password before storing it
        // bycrypt Password
        console.log(HashPassword);
        // Check if the user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Check if the password is empty
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        // Check if the username is empty  
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        // insert the new user into the database
        const NewUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, HashPassword]);
        
        // Create a default todo for the new user
        const firstTodo = await pool.query("INSERT INTO todos (title, description, user_id) VALUES ($1, $2,$3) RETURNING *",[ "First Todo", "This is your first todo, Click the + Button to add more todos!", NewUser.rows[0].id]);
        
        const token = jwt.sign({ id: NewUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }
        // Check if the password is correct
        const validPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate a token
        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({         
            success: true,
            token: token,
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
            },});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;