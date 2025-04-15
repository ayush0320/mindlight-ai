const mongoose = require('mongoose'); //Object Data Modeling (ODM) tool for MongoDB and Node.js
//Provides a schema-based solution

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

//This creates a model called 'User' based on the schema and exports it so it can be used in other files
//MongoDB will create a collection called 'users' (lowercase and plural by convention) in your database
module.exports = mongoose.model('User', userSchema);