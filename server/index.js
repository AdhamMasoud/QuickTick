import express from 'express'
import cors from 'cors';
// To database connection
// To serve static files (like HTML, CSS, JS) from the build directory
import path from 'path';
// To read .env files
import dotenv from 'dotenv';
// To read the current directory
import { fileURLToPath } from 'url';
// To use the router for todos
import TodosRoutes from './TodosRoutes.js';
import AuthRoutes from './AuthRoutes.js';
import authMiddleware from './authMiddleware.js';
// To create a server
const app = express();
// To read .env files
dotenv.config();


// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
// To use CORS (Cross-Origin Resource Sharing) to allow requests from different origins
app.use(cors());
// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'client/build')));

//API routes
app.use('/todos',authMiddleware,TodosRoutes)
app.use('/auth', AuthRoutes);

// Serve an HTML page for a specific route
app.get('/', async(req, res) => {
    try {
        res.sendFile(path.join(__dirname,'..', 'client' ,'build', 'index.html'));
    } catch (err) {
        console.error(err.message);
    }
})

const PORT = process.env.PORT || 5100;
app.listen(process.env.PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (err) {
        console.error(err.message);
    }
});