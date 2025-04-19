import {
    Box,
    Container,
    Heading,
    VStack,
    Input,
    Textarea,
    Button,
    HStack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const MoodTracker = () => {
    const [moods, setMoods] = useState([]);
    const [mood, setMood] = useState('');
    const [notes, setNotes] = useState('');

    const handleLogMood = () => {
        if (mood.trim() === '') return;

        const newMood = {
            mood,
            notes,
            date: new Date().toLocaleString(),
        };

        setMoods([newMood, ...moods]);
        setMood('');
        setNotes('');
    };

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6}>
                <Heading size="lg">Mood Tracker</Heading>
                <Box w="100%">
                    <Input
                        placeholder="How are you feeling?"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                    />
                    <Textarea
                        placeholder="Add some notes (optional)"
                        mt={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <Button colorScheme="teal" mt={2} onClick={handleLogMood}>
                        Log Mood
                    </Button>
                </Box>
                <Box w="100%">
                    {moods.map((entry, index) => (
                        <Box
                            key={index}
                            p={4}
                            bg="gray.100"
                            borderRadius="md"
                            border="1px solid gray.300"
                            mb={2}
                        >
                            <Text fontWeight="bold">{entry.mood}</Text>
                            <Text color="gray.600">{entry.notes}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {entry.date}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </VStack>
        </Container>
    );
};

export default MoodTracker;