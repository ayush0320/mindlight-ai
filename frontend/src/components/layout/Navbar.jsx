import { Box, Flex, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <Box bg="teal.500" px={4} py={3}>
            <Flex maxW="container.lg" mx="auto" alignItems="center" justifyContent="space-between">
                <Heading size="md" color="white">
                    Mental Health Assistant
                </Heading>
                <Flex gap={6}>
                    <Link as={RouterLink} to="/" color="white">
                        Home
                    </Link>
                    <Link as={RouterLink} to="/chat" color="white">
                        Chat
                    </Link>
                    <Link as={RouterLink} to="/mood" color="white">
                        Mood Tracker
                    </Link>
                    <Link as={RouterLink} to="/resources" color="white">
                        Resources
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Navbar