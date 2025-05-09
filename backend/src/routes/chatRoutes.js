const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const chatController = require('../controllers/chatController');

// Route for getting chat history
router.get('/:sessionId', async (req, res) => {
    try {
        const chatHistory = await Chat.findOne({ sessionId: req.params.sessionId });
        if (!chatHistory) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for storing chat messages in the database
router.post('/store', async (req, res) => {
    // Deconstructing - Extract sessionId, sender, and message from the request body
    const { sessionId, sender, message } = req.body;

    try {
        let chat = await Chat.findOne({ sessionId });
        if (!chat) {
            // Creates a new chat with the sessionId
            // Initializes it with an empty messages array
            chat = new Chat({ sessionId: sessionId, messages: [] });
        }
        chat.messages.push({ sender, message }); // Changed from chat.message to chat.messages
        await chat.save();
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route for handling chat requests with AI
router.post('/', chatController.chatWithAI);

module.exports = router;