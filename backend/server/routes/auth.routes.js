import express from 'express';
import {signup,login} from '../controllers/auth.controller.js'; 
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Sign Up Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Example Protected Route 
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You accessed a protected resource!', user: req.user });
});

export default router;
