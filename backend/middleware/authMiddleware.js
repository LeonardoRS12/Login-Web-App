const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({ error: 'Authorization token required' });
        }

        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        // Check if the user is blocked
        if (user.status === 'blocked') {
            return res.status(403).send({ error: 'User is blocked. Access denied.' });
        }

        // Attach user to the request object for access in controllers
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;