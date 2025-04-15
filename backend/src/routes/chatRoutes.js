const express = require('express');
const router = express.Router();
const chat = require('../models/Chat');
const Chat = require('../models/Chat');

//1. GET Route (Retrieving Chat History)
//GET /api/chat/:sessionId:
// Retrieves the chat history for a given session ID.
// Returns a 404 status if no chat history is found.
//:sessionId means it expects a sessionId in the URL (like /123)

router.get('/:sessionID', async (req, res) => {
    try {
        const chatHistory = await Chat.findOne({ sessionID: req.params.sessionID });
        if (!chatHistory) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//2. POST Route (Saving New Messages)
// POST /api/chat/:
// Allows adding a new message to the chat for a specific session ID.
// If a chat history does not exist for the session ID, it creates a new one.

router.post('/', async (req, res) => {
    //Deconstructing- Extract sessionId, sender, and message from the request body
    const { sessionID, sender, message } = req.body;

    try {
        let chat = await Chat.findOne({ sessionId });
        if (!chat) {
            //Creates a new chat with the sessionId
            //Initializes it with an empty messages array
            chat = new Chat({ sessionId, message: [] });
        }
        chat.message.push({ sender, message });
        await chat.save();
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;

//GET: http://mindlightai.com/chats/123 to get all messages from session 123
//POST: Send to http://mindlightai.com/chats with data like:
// {
//     "sessionId": "123",
//     "sender": "user",
//     "message": "Hello there!"
//   }