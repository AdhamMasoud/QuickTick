import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.userId = decoded.id; // Attach the user ID to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.log('Received Token:', req.headers['authorization']);
        res.status(401).json({ error: 'Invalid or expired authentication token.' });
    }
};

export default authMiddleware;