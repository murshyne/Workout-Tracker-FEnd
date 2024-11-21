import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home'; 
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />  {/* Home page route */}
                <Route path="/signup" element={<Signup />} />  {/* Signup page route */}
                <Route path="/login" element={<Login />} />  {/* Login page route */}
                <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page route */}
            </Routes>
        </Router>
    );
};

export default App;
