// This is a simple chat application using React.
// It allows users to send messages and receive responses from a mock AI chatbot.

import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Input,
    Button,
    Text,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);
    const toast = useToast();

    // Generate a session ID on component mount if none exists
    useEffect(() => {
        if (!sessionId) {
            setSessionId(`session_${Date.now()}`);
        }
    }, []);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        // Store the message text before clearing the input
        const messageText = input.trim();

        // Add user message to chat
        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setInput('');
        setIsLoading(true);

        try {
            // Send message to backend API
            const response = await axios.post('http://localhost:5000/chat', {
                message: messageText
            });

            // Add AI response to chat
            if (response.data.success) {
                setMessages(prev => [
                    ...prev,
                    { sender: 'bot', text: response.data.message }
                ]);

                // Optionally store the conversation in the database
                if (sessionId) {
                    try {
                        await axios.post('http://localhost:5000/chat/store', {
                            sessionId: sessionId,
                            sender: 'user',
                            message: messageText
                        });

                        await axios.post('http://localhost:5000/chat/store', {
                            sessionId: sessionId,
                            sender: 'bot',
                            message: response.data.message
                        });
                    } catch (storeError) {
                        console.error('Error storing chat:', storeError);
                        // We don't need to show this error to the user
                    }
                }
            } else {
                console.error('API Error:', response.data);
                throw new Error(response.data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat error:', error);

            // Show more detailed error in console
            if (error.response) {
                console.error('Error response:', error.response.data);
            }

            toast({
                title: 'Error',
                description: error.message || 'Failed to get a response from the AI. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });

            // Add error message to chat
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSend();
        }
    };

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={4} align="stretch">
                <Heading size="lg" textAlign="center">
                    MindLight AI Chat
                </Heading>
                <Text textAlign="center" color="gray.600">
                    Your mental wellness companion
                </Text>

                <Box
                    bg="gray.50"
                    borderRadius="lg"
                    p={4}
                    h="60vh"
                    overflowY="auto"
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="sm"
                >
                    {messages.length === 0 ? (
                        <VStack
                            justify="center"
                            h="100%"
                            color="gray.500"
                            spacing={3}
                        >
                            <Text fontSize="lg">Welcome to MindLight AI</Text>
                            <Text textAlign="center">How can I support your mental wellness today?</Text>
                        </VStack>
                    ) : (
                        messages.map((msg, index) => (
                            <HStack
                                key={index}
                                justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                                mb={3}
                            >
                                <Box
                                    bg={msg.sender === 'user' ? 'teal.500' : 'gray.200'}
                                    color={msg.sender === 'user' ? 'white' : 'black'}
                                    px={4}
                                    py={2}
                                    borderRadius="lg"
                                    maxW="80%"
                                >
                                    <Text whiteSpace="pre-wrap">{msg.text}</Text>
                                </Box>
                            </HStack>
                        ))
                    )}
                    {isLoading && (
                        <HStack justify="flex-start" mb={3}>
                            <Box bg="gray.200" px={4} py={2} borderRadius="lg">
                                <HStack spacing={2}>
                                    <Spinner size="sm" color="teal.500" />
                                    <Text>Thinking...</Text>
                                </HStack>
                            </Box>
                        </HStack>
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                <HStack>
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        _focus={{ borderColor: 'teal.500' }}
                    />
                    <Button
                        colorScheme="teal"
                        onClick={handleSend}
                        isLoading={isLoading}
                        loadingText="Sending"
                        isDisabled={input.trim() === '' || isLoading}
                    >
                        Send
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};

export default Chat;