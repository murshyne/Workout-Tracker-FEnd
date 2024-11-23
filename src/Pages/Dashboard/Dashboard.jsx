import React, { useState } from 'react';
import './Dashboard.module.css';
import { useCookies } from 'react-cookie';
import Exercises from './Exercises';  // Import Exercises component
import Meals from './Meals';  // Import Meals component

const Dashboard = () => {
  const [goals, setGoals] = useState([ ]);
  const [newGoal, setNewGoal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cookies] = useCookies(['authToken', 'firstName']); // Assuming userName is stored in cookies

  // Assuming the user's name is saved in a cookie named 'userName'
  const userFirstName = cookies.firstName || 'Hey'; // Default to 'User' if name is not in cookies

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

  return (
    <div className="dashboard">
      <h2>{userFirstName}!, Welcome To Your Dashboard</h2> {/* Display dynamic username */}

      {/* Goals Section */}
      <div className="goals-section">
        <h3>Your Fitness Goals</h3>
        <ul>
          {goals.map((goal) => <li key={goal.id}>{goal.text}</li>)}
        </ul>
        <input
          type="text"
          placeholder="e.g., Run 5 miles this week"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      {/* Meal Section */}
      <Meals />  {/* Render Meals component */}

      {/* Exercise Section */}
      <Exercises />  {/* Render Exercises component */}

      {/* File Upload */}
      <div className="upload-section">
        <h3>Upload Your Progress</h3>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={submitFile}>Upload</button>
      </div>
    </div>
  );
};

export default Dashboard;
