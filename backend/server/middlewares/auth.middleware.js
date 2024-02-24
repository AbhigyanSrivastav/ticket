import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Get token from header
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default authMiddleware;
