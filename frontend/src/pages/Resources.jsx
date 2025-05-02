import {
    Box,
    Container,
    Heading,
    VStack,
    Text,
    Link,
    Input,
    Select,
    SimpleGrid,
} from '@chakra-ui/react';
import { useState } from 'react';

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
    {
        id: 4,
        category: 'Articles',
        title: 'Dealing with Stress',
        description: 'Tips and strategies for managing stress effectively.',
        link: 'https://example.com/articles/stress',
    },
    {
        id: 5,
        category: 'Videos',
        title: 'Yoga for Relaxation',
        description: 'A short yoga routine to help you relax.',
        link: 'https://example.com/videos/yoga',
    },
];

const Resources = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    // Filter resources based on search and category
    const filteredResources = resources.filter((resource) => {
        const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
            category === 'All' || resource.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6} align="stretch">
                <Heading size="lg">Resource Hub</Heading>

                {/* Search and Filter */}
                <Box>
                    <Input
                        placeholder="Search resources..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        mb={4}
                    />
                    <Select
                        placeholder="Filter by category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Articles">Articles</option>
                        <option value="Videos">Videos</option>
                        <option value="Activities">Activities</option>
                    </Select>
                </Box>

                {/* Resource Grid */}
                {filteredResources.length === 0 ? (
                    <Text>No resources found. Try adjusting your search or filter.</Text>
                ) : (
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        {filteredResources.map((resource) => (
                            <Box
                                key={resource.id}
                                p={4}
                                bg="gray.100"
                                borderRadius="md"
                                border="1px solid gray.300"
                            >
                                <Heading size="md" mb={2}>
                                    {resource.title}
                                </Heading>
                                <Text mb={2}>{resource.description}</Text>
                                <Link href={resource.link} color="teal.500" isExternal>
                                    View Resource
                                </Link>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </VStack>
        </Container>
    );
};

export default Resources;

//=======================================================================================================

// import { Box, Container, Heading, VStack, Text, Link } from '@chakra-ui/react';

// const resources = [
//     {
//         id: 1,
//         category: 'Articles',
//         title: 'Understanding Anxiety',
//         description: 'A guide to understanding and managing anxiety.',
//         link: 'https://example.com/articles/anxiety',
//     },
//     {
//         id: 2,
//         category: 'Videos',
//         title: 'Mindfulness Meditation',
//         description: 'A guided meditation session for mindfulness.',
//         link: 'https://example.com/videos/mindfulness',
//     },
//     {
//         id: 3,
//         category: 'Activities',
//         title: 'Daily Gratitude Journal',
//         description: 'A journaling activity to practice gratitude.',
//         link: 'https://example.com/activities/gratitude',
//     },
// ];

// const Resources = () => {
//     return (
//         <Container maxW="container.lg" py={10}>
//             <VStack spacing={6} align="stretch">
//                 <Heading size="lg">Resource Hub</Heading>
//                 {resources.map((resource) => (
//                     <Box
//                         key={resource.id}
//                         p={4}
//                         bg="gray.100"
//                         borderRadius="md"
//                         border="1px solid gray.300"
//                     >
//                         <Heading size="md">{resource.title}</Heading>
//                         <Text>{resource.description}</Text>
//                         <Link href={resource.link} color="teal.500" isExternal>
//                             View Resource
//                         </Link>
//                     </Box>
//                 ))}
//             </VStack>
//         </Container>
//     );
// };

// export default Resources;