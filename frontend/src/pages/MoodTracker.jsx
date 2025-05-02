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
    useToast,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
// useState: Manages state (data that changes over time)
// useEffect: Runs code when the component is mounted or when certain data changes

// Library to render a line chart.
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

//=======================================================================================================

const MoodTracker = () => {
    const [moods, setMoods] = useState([]); // An array containing all saved mood entries
    const [mood, setMood] = useState(''); // Text field for the current mood being entered (like "Happy")
    const [intensity, setIntensity] = useState(''); // Number field for rating the mood (1-5)
    const [notes, setNotes] = useState(''); // Optional text notes about the mood
    const toast = useToast(); // Display non-intrusive notification messages

    // Load moods from localStorage on component mount
    // It tries to get saved mood data from localStorage using localStorage.getItem('moods')
    useEffect(() => {
        const storedMoods = JSON.parse(localStorage.getItem('moods')) || [];
        setMoods(storedMoods);  //Updates the state with the loaded data
    }, []);

    // Save moods to localStorage whenever moods change
    useEffect(() => {
        localStorage.setItem('moods', JSON.stringify(moods)); // Converts the array into a JSON string for storage
        // Saves this string to localStorage
    }, [moods]);  // Dependency array means "run this effect when moods changes"

    // Handling Form Submission
    const handleLogMood = () => {
        if (!mood || !intensity) {
            toast({
                title: 'Please fill in all required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newMood = {
            mood,
            intensity: parseInt(intensity),
            notes,
            date: new Date().toLocaleString(),
        };

        setMoods([newMood, ...moods]);
        setMood('');
        setIntensity('');
        setNotes('');

        toast({
            title: 'Mood logged successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    // Prepare data for the chart
    const chartData = {
        labels: moods.map((entry) => entry.date),
        datasets: [
            {
                label: 'Mood Intensity',
                data: moods.map((entry) => entry.intensity),
                fill: false,
                borderColor: 'teal',
                tension: 0.1,
            },
        ],
    };

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6}>
                <Heading size="lg">Mood Tracker</Heading>
                {/* Mood Logging Form */}
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                    <Heading size="md" mb={4}>
                        Log Your Mood
                    </Heading>
                    <VStack spacing={3} align="stretch">
                        <Input
                            placeholder="How are you feeling? (e.g., Happy, Sad)"
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                        />
                        <Input
                            placeholder="Intensity (1-5)"
                            type="number"
                            value={intensity}
                            onChange={(e) => setIntensity(e.target.value)}
                        />
                        <Textarea
                            placeholder="Add some notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Button colorScheme="teal" onClick={handleLogMood}>
                            Log Mood
                        </Button>
                    </VStack>
                </Box>

                {/* Mood History */}
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                    <Heading size="md" mb={4}>
                        Mood History
                    </Heading>
                    {moods.length === 0 ? (
                        <Text>No moods logged yet. Start by logging your first mood!</Text>
                    ) : (
                        moods.map((entry, index) => (
                            <Box
                                key={index}
                                p={3}
                                bg="white"
                                borderRadius="md"
                                border="1px solid gray.300"
                                mb={2}
                            >
                                <Text fontWeight="bold">{entry.mood}</Text>
                                <Text color="gray.600">Intensity: {entry.intensity}</Text>
                                <Text color="gray.600">{entry.notes}</Text>
                                <Text fontSize="sm" color="gray.500">
                                    {entry.date}
                                </Text>
                            </Box>
                        ))
                    )}
                </Box>

                {/* Mood Trend Chart */}
                <Box w="100%" p={4} bg="gray.100" borderRadius="md" boxShadow="md">
                    <Heading size="md" mb={4}>
                        Mood Trends
                    </Heading>
                    {moods.length === 0 ? (
                        <Text>No data to display. Log some moods to see trends!</Text>
                    ) : (
                        <Line data={chartData} />
                    )}
                </Box>
            </VStack>
        </Container>
    );
};

export default MoodTracker;