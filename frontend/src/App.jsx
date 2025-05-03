// -> It acts as the entry point for the React component tree
// -> It is often used to define the structure and logic of the application
// -> In applications with React Router, App.jsx often contains the routing logic, defining different routes for the app
// -> It imports and renders other components, such as headers, footers, and main content.


import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import MoodTracker from './pages/MoodTracker'
import Resources from './pages/Resources'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App