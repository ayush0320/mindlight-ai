const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

// Initialize the Gemini API with your API key
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyC9E6PiiA2NDH0bBoBc-A-a9YKMZtj3Ec8';
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = genAI;