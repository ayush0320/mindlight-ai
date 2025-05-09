// 
// This file is responsible for setting up the Express server and connecting to the MongoDB database.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

//Load environment variables
// dotenv.config();
// console.log(process.env)

//Create express app
const app = express();

//Connect to mongoDB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/chat', require('./routes/chatRoutes'));
app.use('/mood', require('./routes/moodRoutes'));
app.use('/resources', require('./routes/resourceRoutes'));

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

//Error handler
app.use(errorHandler);