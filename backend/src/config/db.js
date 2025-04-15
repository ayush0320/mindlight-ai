require('dotenv').config();
const mongoose = require('mongoose'); //Mongoose is a library that makes it easier to interact with MongoDB in a Node.js application
// //It helps with connecting to the database and defining "models" for storing and retrieving data

//Define connectDB function
//connectDB is an asynchronous function, which means it can handle tasks that take time (like connecting to a database)
// without blocking the rest of the program.
const connectDB = async () => {
    try {

        //Attempt a connection
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        console.log(`MongoDB connected yayy! ${conn.connection.host}`);
    } catch (error) {
        //Handle errors
        console.error(`Error: ${error.message}`);
        process.exit(1); //This stops the program immediately with an exit code of 1, indicating an error occurred
    }
};

module.exports = connectDB;


// Check if the URI exists
// if (!process.env.MONGODB_URI) {
//     console.error('MongoDB URI is not defined in environment variables');
//     process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));