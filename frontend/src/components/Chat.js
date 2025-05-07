// // frontend/src/components/Chat.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Effect to scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Start a new chat session when component mounts
    useEffect(() => {
        const startNewSession = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                setLoading(true);
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/chat/session`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSessionId(response.data.data.sessionId);

                // Add a welcome message from the AI
                setMessages([
                    {
                        sender: 'ai',
                        content: "Hello, I'm John, your therapist today. How are you feeling? What brings you here today?",
                        timestamp: new Date(),
                    },
                ]);
            } catch (error) {
                console.error('Error starting chat session:', error);
                alert('Failed to start chat session. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        startNewSession();
    }, [navigate]);

    // Send message to the AI
    const sendMessage = async (e) => {
        e.preventDefault();

        if (!input.trim() || !sessionId) return;

        const userMessage = {
            sender: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chat/message`,
                {
                    sessionId,
                    message: userMessage.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const aiMessage = {
                sender: 'ai',
                content: response.data.data.aiResponse,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-3/4 ${message.sender === 'user'
                                ? 'bg-blue-100 ml-auto'
                                : 'bg-gray-100'
                            }`}
                    >
                        <p className="text-sm font-semibold mb-1">
                            {message.sender === 'user' ? 'You' : 'John (AI Therapist)'}
                        </p>
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                    </div>
                ))}
                {loading && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm font-semibold">John is typing...</p>
                        <div className="flex space-x-1 mt-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-4 border-t">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-blue-500 text-white rounded-r-lg ${loading || !input.trim()
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-600'
                            }`}
                        disabled={loading || !input.trim()}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chat;






// import React, { useState, useEffect, useRef } from 'react';
// import '../styles/Chat.css';
// import { getChatResponse, getWelcomeMessage } from '../services/apiService';
// import sendIcon from '../assets/send-icon.png';

// const Chat = () => {
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [isTyping, setIsTyping] = useState(false);
//     const endOfMessagesRef = useRef(null);

//     useEffect(() => {
//         // Display welcome message when component mounts
//         const showWelcomeMessage = async () => {
//             setIsTyping(true);
//             try {
//                 const welcomeMessage = await getWelcomeMessage();
//                 setMessages([{ text: welcomeMessage, sender: 'bot' }]);
//             } catch (error) {
//                 console.error("Error showing welcome message:", error);
//                 setMessages([{ text: "Hi there! I'm MindLight AI. How can I help you today?", sender: 'bot' }]);
//             }
//             setIsTyping(false);
//         };

//         showWelcomeMessage();
//     }, []);

//     useEffect(() => {
//         // Scroll to bottom when messages change
//         endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (input.trim() === '') return;

//         const userMessage = { text: input, sender: 'user' };
//         setMessages(prevMessages => [...prevMessages, userMessage]);
//         setInput('');
//         setIsTyping(true);

//         try {
//             // Get response from backend API
//             const response = await getChatResponse(input, messages);

//             // Add bot response to messages
//             setMessages(prevMessages => [
//                 ...prevMessages,
//                 { text: response, sender: 'bot' }
//             ]);
//         } catch (error) {
//             console.error("Error in chat:", error);
//             setMessages(prevMessages => [
//                 ...prevMessages,
//                 {
//                     text: "I'm having trouble connecting right now. Please try again later.",
//                     sender: 'bot'
//                 }
//             ]);
//         }

//         setIsTyping(false);
//     };

//     return (
//         <div className="chat-container">
//             <div className="messages-container">
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
//                     >
//                         {message.text}
//                     </div>
//                 ))}
//                 {isTyping && (
//                     <div className="message bot-message typing">
//                         <div className="typing-indicator">
//                             <span></span>
//                             <span></span>
//                             <span></span>
//                         </div>
//                     </div>
//                 )}
//                 <div ref={endOfMessagesRef} />
//             </div>
//             <form className="input-container" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type your message..."
//                     className="message-input"
//                 />
//                 <button type="submit" className="send-button">
//                     <img src={sendIcon} alt="Send" />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Chat;