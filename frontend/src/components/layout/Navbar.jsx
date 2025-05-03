import { Box, Flex, Link, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom'; //Used for navigation in React applications
// It automatically detects the "active" state of a link (the current page)

//Defines a functional component called Navbar
const Navbar = () => {

    //JavaScript object that defines the default styles for navigation links
    const linkStyles = {
        color: 'white',
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: 'md',
    };

    //Object defines styles for the active navigation link
    const activeLinkStyles = {
        ...linkStyles,
        backgroundColor: 'teal.700', // Highlight active link
    };

    return (

        //Container for the entire navbar
        <Box bg="teal.500" px={4} py={3}>
            <Flex maxW="container.lg" mx="auto" alignItems="center" justifyContent="space-between">
                <Heading size="md" color="white">
                    Mental Health Assistant
                </Heading>
                <Flex gap={4}>

                    {/* //Dynamically sets the link's style based on whether it is "active"
                    isActive: A property provided by NavLink that indicates if the link corresponds to the current page
                    If the link is active, it uses activeLinkStyles; otherwise, it uses linkStyles */}
                    <NavLink
                        to="/"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/chat"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Chat
                    </NavLink>
                    <NavLink
                        to="/mood"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Mood Tracker
                    </NavLink>
                    <NavLink
                        to="/resources"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Resources
                    </NavLink>
                    <NavLink
                        to="/login"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        style={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
                    >
                        Register
                    </NavLink>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;