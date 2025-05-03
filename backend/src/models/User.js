const mongoose = require('mongoose'); //Object Data Modeling (ODM) tool for MongoDB and Node.js
//Provides a schema-based solution

const brypt = require('bcryptjs'); // Library for hashing passwords securely

//Creating a new schema (blueprint or template) for a "User" document
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Adding Pre-Save Middleware (Hook)
// Hash password before saving
// Hashing in JWTs is a crucial security mechanism used to verify the integrity and authenticity of the token

userSchema.pre('save', async function (next) { // Middleware function that runs pre saving a document
    if (!this.isModified('password')) return next(); // If password is not modified, move to the next middleware
    const salt = await brypt.genSalt(10); // Generate a salt with 10 rounds of hashing
    this.password = await brypt.hash(this.password, salt); // Hash the password with the generated salt
    next(); // Call next middleware in the stack
})

// Compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) { // Method to compare passwords
    return await brypt.compare(enteredPassword, this.password); // Compare entered password with the hashed password in the database
}

//This creates a model called 'User' based on the schema and exports it so it can be used in other files
//MongoDB will create a collection called 'users' (lowercase and plural by convention) in your database
module.exports = mongoose.model('User', userSchema);