import {
    Box,
    Container,
    Heading,
    VStack,
    HStack,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        // Add bot's response (mock for now)
        setMessages((prev) => [
            ...prev,
            { sender: 'user', text: input },
            { sender: 'bot', text: 'I am here to help you!' },
        ]);
    };

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={4} align="stretch">
                <Heading size="lg" textAlign="center">
                    AI Chatbot
                </Heading>
                <Box
                    bg="gray.100"
                    borderRadius="md"
                    p={4}
                    h="60vh"
                    overflowY="auto"
                    border="1px solid gray.300"
                >
                    {messages.map((msg, index) => (
                        <HStack
                            key={index}
                            justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                            mb={2}
                        >
                            <Box
                                bg={msg.sender === 'user' ? 'teal.500' : 'gray.300'}
                                color={msg.sender === 'user' ? 'white' : 'black'}
                                px={4}
                                py={2}
                                borderRadius="md"
                            >
                                <Text>{msg.text}</Text>
                            </Box>
                        </HStack>
                    ))}
                </Box>
                <HStack>
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button colorScheme="teal" onClick={handleSend}>
                        Send
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};

export default Chat;