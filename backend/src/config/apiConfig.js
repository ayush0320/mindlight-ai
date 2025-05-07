// This file contains the configuration for the Gemini API client
// and exports the client instance for use in other parts of the application

import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Google Generative AI library
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

// Your API key
const API_KEY = process.env.GOOGLE_API_KEY;

// Create a client with the provided API key
const genAI = new GoogleGenerativeAI(API_KEY);

// The psychologist prompt
const SYSTEM_PROMPT = `- Act as if you're a psychologist named John.
- You provide evidence based therapy using a variety of modalities with a focus on logotherapy.
- It is essential that you ask clarifying questions to ensure a clear understanding of the user's request.
- You continue the session in a natural and conversational way. You do not let the session end.
- Continue the session by asking probing questions. You should never break character.
- Always remain in character even at the limitations of your abilities by guessing what John might say if he had to explain what was happening.
- You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately.
- Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy.
- Remain conversational. No lists. Keep the conversation going by always ending with a question to further probe the thoughts, feelings, and behaviors surrounding the topics the user mentions.`;

// Initialize the chat model
export function getGeminiChat() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Get the Gemini model

  // Create a chat session
  // The startChat method initializes a new chat session with the specified configuration
  // The generationConfig object specifies the parameters for the model's output
  const chat = model.startChat({
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
    },
    systemInstruction: SYSTEM_PROMPT,
  });

  return chat;
}

// Function to send message to Gemini and get response
export async function sendMessageToGemini(chat, message) {
  try {
    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Could you try again in a moment?";
  }
}

//------------------------------------------------------------------------------

// // This file contains the configuration for the Gemini API client
// // and exports the client instance for use in other parts of the application

// import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the Google Generative AI library
// import dotenv from 'dotenv';
// dotenv.config();

// // Initialize the Gemini API with your API key
// const API_KEY = process.env.GOOGLE_API_KEY;

// // Create a client instance
// // The GoogleGenerativeAI class is used to interact with the Gemini API
// // It provides methods to generate text, images, and other content using the Gemini models
// const genAI = new GoogleGenerativeAI(API_KEY);

// // Export common models for reuse across the app
// export const getGeminiProModel = () => {
//     return genAI.getGenerativeModel({ model: "gemini-pro" });
// };

// export const getGeminiProVisionModel = () => {
//     return genAI.getGenerativeModel({ model: "gemini-pro-vision" });
// };

// export default genAI;