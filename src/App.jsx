import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/HomePage/Home'; 
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />  {/* Home page route */}
                <Route path="/signup" element={<Signup />} />  {/* Signup page route */}
                <Route path="/login" element={<Login />} />  {/* Login page route */}
                <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page route */}
            </Routes>
        </>
    );
};

export default App;
