import { Box, Container, Heading, VStack, Text, Link } from '@chakra-ui/react';

const resources = [
    {
        id: 1,
        category: 'Articles',
        title: 'Understanding Anxiety',
        description: 'A guide to understanding and managing anxiety.',
        link: 'https://example.com/articles/anxiety',
    },
    {
        id: 2,
        category: 'Videos',
        title: 'Mindfulness Meditation',
        description: 'A guided meditation session for mindfulness.',
        link: 'https://example.com/videos/mindfulness',
    },
    {
        id: 3,
        category: 'Activities',
        title: 'Daily Gratitude Journal',
        description: 'A journaling activity to practice gratitude.',
        link: 'https://example.com/activities/gratitude',
    },
];

const Resources = () => {
    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6} align="stretch">
                <Heading size="lg">Resource Hub</Heading>
                {resources.map((resource) => (
                    <Box
                        key={resource.id}
                        p={4}
                        bg="gray.100"
                        borderRadius="md"
                        border="1px solid gray.300"
                    >
                        <Heading size="md">{resource.title}</Heading>
                        <Text>{resource.description}</Text>
                        <Link href={resource.link} color="teal.500" isExternal>
                            View Resource
                        </Link>
                    </Box>
                ))}
            </VStack>
        </Container>
    );
};

export default Resources;