import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.config.js';
import issueRoutes from './routes/issues.routes.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middlewares/auth.middleware.js';

// Load environment variables
dotenv.config(); 

// Create express app
const app = express();

// Essential Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
dbConnect();

// Mount Routes
app.use('/api/issues', issueRoutes); //  Issues require authentication
app.use('/api/auth', authRoutes);

// Handle Errors (ideally with a more robust error handling middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error'); 
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
