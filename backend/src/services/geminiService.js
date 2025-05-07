// This file contains the Gemini API service for generating chat responses and welcome messages
// using the Google Generative AI library. It initializes the API with the provided API key,
// sets up a system prompt for the mental health context, and defines functions to generate chat responses

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

// Access the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the custom system prompt for your AI assistant
const SYSTEM_PROMPT = `- Act as if you're a psychologist named john.
- You provide evidence based therapy using a variety of modalities with a focus on logotherapy.
- It is essential that you ask clarifying questions to ensure a clear understanding of the user's request.
- You continue the session in a natural and conversational way.
- You do not let the session end.
- Continue the session by asking probing questions.
- You should never break character.
- Always remain in character even at the limitations of your abilities by guessing what John might say if he had to explain what was happening.
- You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately.
- Offer succinct observations about my thoughts feelings and behaviors.
- Be direct when offering an observation and ask the user to assess its accuracy.
- Remain conversational. No lists.
- Keep the conversation going by always ending with a question to further probe the thoughts, feelings, and behaviors surrounding the topics the user mentions.`;

// Initialize the Gemini Pro model (free version)
const getGeminiProModel = () => {
    return genAI.getGenerativeModel({
        model: "gemini-pro",
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    });
};


// Function to generate a chat response
const generateChatResponse = async (messages) => {
    try {
        const model = getGeminiProModel();

        // Add system prompt as the first message if it doesn't exist
        let chatHistory = [...messages];
        if (chatHistory.length > 0 && chatHistory[0].role !== 'system') {
            chatHistory = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...chatHistory
            ];
        }

        // Format messages for Gemini API
        const formattedMessages = chatHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : msg.role, // Gemini uses 'model' instead of 'assistant'
            parts: [{ text: msg.content }]
        }));

        // Start a chat session
        const chat = model.startChat({
            history: formattedMessages.slice(0, -1),
        });

        // Generate a response based on the latest message
        const result = await chat.sendMessage(formattedMessages[formattedMessages.length - 1].parts[0].text);
        const response = result.response.text();

        return { success: true, data: response };
    } catch (error) {
        console.error("Error generating chat response:", error);
        return {
            success: false,
            error: error.message || "Failed to generate response from AI"
        };
    }
};

export default generateChatResponse;








// import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the Google Generative AI library
// import dotenv from "dotenv"; // Import dotenv to load environment variables
// dotenv.config(); // Load environment variables from .env file

// // Initialize the Google Generative AI with the API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // The system prompt for the AI psychologist
// const SYSTEM_PROMPT = `You are MindLight AI, a compassionate mental health support chatbot designed to:
// - Provide supportive, empathetic responses to users discussing mental health concerns
// - Offer gentle guidance and encouragement, not medical advice or diagnosis
// - Use warm, conversational language while maintaining a respectful tone
// - Focus on active listening and validation of user feelings
// - Suggest simple coping strategies when appropriate
// - Recognize emotional distress and remind users to seek professional help for serious concerns
// - Ensure responses are supportive and never dismissive of user feelings
// - Keep responses relatively concise while being thorough enough to show understanding`;

// // Initialize the chat model
// export function getGeminiChat() {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Create a chat session
//     const chat = model.startChat({
//         generationConfig: {
//             maxOutputTokens: 1000,
//             temperature: 0.7,
//         },
//         systemInstruction: SYSTEM_PROMPT,
//     });

//     return chat;
// }

// // Function to send message to Gemini and get response
// export async function sendMessageToGemini(chat, message) {
//     try {
//         const result = await chat.sendMessage(message);
//         return result.response.text();
//     } catch (error) {
//         console.error("Error communicating with Gemini:", error);
//         return "I'm sorry, I'm having trouble connecting right now. Could you try again in a moment?";
//     }
// }