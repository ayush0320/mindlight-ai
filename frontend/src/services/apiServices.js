import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';

/**
 * Send a chat message to the AI and get a response
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise} - Promise with the AI's response
 */
export const sendChatMessage = async (messages) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, { messages });
        return response.data;
    } catch (error) {
        console.error('Error in AI service:', error);

        // Return a formatted error response
        return {
            success: false,
            error: error.response?.data?.error || 'Failed to connect to AI service'
        };
    }
};