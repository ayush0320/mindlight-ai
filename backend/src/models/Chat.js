const mongoose = require('mongoose');

//Used to identify a specific conversation
//It ensures that anonymous users can have unique session-based conversations.

//Each message is stored as an object
//Sender: Specifies who sent the message (user or bot).
//message: Content of the message.
//timestamp: Auto-generated timestamp to track when the message was sent.

//Schema
const chatSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    messages: [
        {
            sender: {
                type: String,
                enum: ['user', 'bot'], // Define sender as user or bot
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Model
module.exports = mongoose.model('Chat', chatSchema);