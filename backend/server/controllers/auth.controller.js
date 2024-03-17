import User from '../models/user.model.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'; 

export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username,email, password,role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' }); 
        }
            const salt = await bcrypt.genSalt(10);
            console.log('salt', salt)
        
            const newUser = new User({
                email,
                username,
                password,
                role,
                permissions: []
            });

            const savedUser = await newUser.save();

            const payload = { userId: savedUser._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(201).json({ token });  
        

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; 

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        console.log('password', password)
        console.log('user.password', user.password)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch', isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
