import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6} align="center" textAlign="center">
                <Heading size="2xl">Mindlight AI</Heading>
                <Text fontSize="xl">
                    Your personal companion for mental well-being. Chat with our AI assistant,
                    track your mood, and access helpful resources.
                </Text>
                <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => navigate('/chat')}
                >
                    Start Chatting
                </Button>
            </VStack>
        </Container>
    )
}

export default Home