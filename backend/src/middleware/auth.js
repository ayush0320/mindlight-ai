// Description: Middleware to authenticate users using JWT tokens
// This middleware function checks for a valid JWT token in the request headers

import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for handling JWT tokens
import User from '../models/User.js'; // Import the User model to interact with the user database
import dotenv from 'dotenv';
dotenv.config();

// This middleware function checks for a valid JWT token in the request headers
// If the token is valid, it retrieves the user associated with the token and attaches it to the request object
module.exports = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No authentication token, access denied'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by id
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Token is valid, but user no longer exists'
            });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            error: 'Token is not valid'
        });
    }
};