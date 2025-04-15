const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sessionId: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
    intensity: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    notes: String,
    date: {
        type: Date,
        default: Date.now,
    },
});


//Creates a model named 'Mood' using our schema
module.exports = mongoose.model('Mood', moodSchema);