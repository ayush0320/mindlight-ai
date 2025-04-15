const express = require('express');
const router = express.Router(); //Create a new router
const Mood = require('../models/Mood');

//1. GET Route (Getting/Reading Moods)
router.get('/', async (req, res) => {
    try {
        //It looks for the sessionId that was provided in the URL (like ?sessionId=123)
        const moods = await Mood.find({ sessionId: req.query.sessionId });
        res.json(moods);
    } catch (error) {
        //Sends back a 500 status code (server error)
        res.statur(500).json({ message: error.message });
    }
})

//2. POST Route (Creating New Moods)
router.post('/', async (req, res) => {
    //This creates a route that handles POST requests (for creating new data)
    const mood = new Mood({
        sessionId: req.body.sessionId,
        mood: req.body.mood,
        intensity: req.body.intensity,
        notes: req.body.notes,
    });

    try {
        //Try to save new mood
        //await mood.save() stores the mood in the database
        //sends back status 201 (created successfully)
        const newMood = await mood.save();
        res.status(201).json(newMethod);
    } catch (error) {
        //Sends back status 400 (bad request)
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;