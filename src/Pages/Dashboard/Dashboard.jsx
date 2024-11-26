import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Updated import to useNavigate
import './Dashboard.css';
import Exercises from './Exercises';  // Import Exercises component
import Meals from './Meals';  // Import Meals component
import axios from 'axios';  // Make sure to import axios for file upload

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cookies, removeCookie] = useCookies(['authToken', 'firstName']);

  console.log(cookies);

  const navigate = useNavigate(); // Hook to navigate

  const userFirstName = cookies.firstName === "undefined" ? 'Hey' : cookies.firstName // Default to 'User' if name is not in cookies

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: goals.length + 1, text: newGoal }]);
      setNewGoal('');
    }
  };

  const handleFileUpload = (e) => setUploadedFile(e.target.files[0]);

  const submitFile = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      try {
        await axios.post('http://localhost:3000/api/uploads', formData, {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        });
        alert('File uploaded successfully!');
        setUploadedFile(null);
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    removeCookie('authToken');
    removeCookie('firstName');
    navigate('/login'); // Use navigate instead of history.push
  };

  // Function to handle deleting the user profile
  const handleDeleteProfile = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (userConfirmed) {
      try {
        await axios.delete('http://localhost:3000/api/users/delete', {
          headers: { Authorization: `Bearer ${cookies.authToken}` },
        });
        alert('Your profile has been deleted.');
        removeCookie('authToken');
        removeCookie('firstName');
        navigate('/login'); // Redirect to login page after deletion
      } catch (err) {
        console.error('Error deleting profile:', err);
        alert('Error deleting profile. Please try again later.');
      }
    }
  };


  
  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="dashboard-header">
        <h2>{userFirstName}! Welcome To Your Dashboard</h2>
      </div>
      <div className="navbar">
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
       
      </div>
      <div className="dashboard-content">
        {/* Goals Section */}
        <div className="section goals-section">
          <h3>Your Fitness Goals</h3>
          <ul>
            {goals.map((goal) => (
              <li key={goal.id}>{goal.text}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="e.g., Run 5 miles this week"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <button onClick={addGoal}>Add Goal</button>
        </div>

        {/* Meals Section */}
        <div className="section meals-section">
          <Meals />  {/* Render Meals component */}
        </div>

        {/* Exercises Section */}
        <div className="section exercises-section">
          <Exercises />  {/* Render Exercises component */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
