// Express router with endpoints for user authentication (registration, login, and profile verification)
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
const router = express.Router(); // This router will contain all our authentication routes (register, login, profile)

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will expire in 30 days
    });
}
// The function returns the generated JWT as a string
// This token can be sent to the client (e.g., in a response to a login request)
// Stored on the client side (e.g., in local storage or cookies)

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body; // Destructuring the request body

    // Check if user already exists
    try {
        const userExists = await User.findOne({ email }); // Check if a user with the same email already exists in the database
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' }); // If user exists, send a 400 response
        }

        // Create a new user
        const user = await User.create({ // Create a new user in the database
            username,
            email,
            password, // Password will be hashed in the pre-save middleware of the User model
        });

        // Generate JWT token
        if (user) {
            res.status(201).json({
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id), // Generate a token for the user
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' }); // If user creation fails
        }
    }

    catch (error) {
        res.status(500).json({ message: 'Server error' }); // If there is a server error
    }
})

// User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Destructuring the request body

    // Check if user exists
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {   // Check if the user exists and if the password matches
            // Generate JWT token
            res.json({
                id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Profile Route
router.get('/profile', async (req, res) => {
    const toker = req.headers.authorization?.split(' ')[1]; // Get the token from the request headers
    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // If no token is provided, send a 401 response
    }
    try {
        const decoded = jwt.verify(token, secret); // Verify the token using the secret key
        const user = await User.findById(decoded.id); // Find the user by ID from the decoded token
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' }); // If user is not found, send a 404 response
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;