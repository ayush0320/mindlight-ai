const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

//Load environment variables
// dotenv.config();
console.log(process.env)

//Create express app
const app = express();

//Connect to mongoDB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/mood', require('./routes/moodRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




// console.log(require('./routes/chatRoutes')); // Should log a function or router
// console.log(require('./routes/moodRoutes')); // Should log a function or router
// console.log(require('./routes/resourceRoutes')); // Should log a function or router
// console.log(require('./middleware/errorHandler')); // Should log a function


//Error handler
app.use(errorHandler);