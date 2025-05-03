import {
    Box,
    Container,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post('/api/auth/register', {
                username,
                email,
                password,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast({
                title: 'Registration successful!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            toast({
                title: 'Registration failed!',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW="container.sm" py={10}>
            <VStack spacing={6}>
                <Heading size="lg">Register</Heading>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button colorScheme="teal" onClick={handleSubmit}>
                    Register
                </Button>
            </VStack>
        </Container>
    );
};

export default Register;