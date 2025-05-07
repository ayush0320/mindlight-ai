// backend/test-gemini.js
// Create this file to test the Gemini API connection directly

import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Google Generative AI library
import dotenv from 'dotenv'; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

// Get API key from environment
const API_KEY = process.env.GEMINI_API_KEY;

// Print API key status (not the actual key)
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');

if (!API_KEY) {
    console.error('API Key is missing! Make sure GEMINI_API_KEY is set in your .env file');
    process.exit(1);
}

// Initialize the API
const genAI = new GoogleGenerativeAI(API_KEY);

// Simple test function
async function testGeminiAPI() {
    try {
        console.log('Testing Gemini API connection...');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent("Tell me a short greeting in one sentence.");
        const response = result.response.text();

        console.log('Successfully received response from Gemini API:');
        console.log(response);

        return true;
    } catch (error) {
        console.error('Gemini API test failed:', error);
        return false;
    }
}

// Run the test
testGeminiAPI()
    .then(success => {
        if (success) {
            console.log('Gemini API connection successful!');
        } else {
            console.log('Gemini API connection failed. Check the errors above.');
        }
    });