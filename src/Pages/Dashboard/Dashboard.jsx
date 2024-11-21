import React, { useState, useEffect } from 'react';
import './Dashboard.module.css';
import { useCookies } from 'react-cookie'; 
import axios from 'axios'; 

const Dashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Run 5 miles this week' },
    { id: 2, text: 'Workout 4 times this week' },
  ]);
  const [newGoal, setNewGoal] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [cookies] = useCookies(['authToken']); 

  // Fetch exercise recommendations from the API
  const fetchExerciseRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/workouts', {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      });
      setExerciseRecommendations(response.data);  // Store the recommendations
      console.log('Recommended workouts:', response.data);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    }
  };

  // Fetch meal plan from the API
  const fetchMealPlan = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/meal-plan', {
        headers: {
          Authorization: `Bearer ${cookies.authToken}`,
        },
      });
      setMealPlan(response.data);  // Store the meal plan
      console.log('Meal plan:', response.data);
    } catch (err) {
      console.error('Error fetching meal plan:', err);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (cookies.authToken) {
      fetchExerciseRecommendations();
      fetchMealPlan();
    }
  }, [cookies.authToken]);  // Only re-run when authToken changes

  // Add a new fitness goal
  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: goals.length + 1, text: newGoal }]);
      setNewGoal('');
    }
  };

  // Handle file upload input
  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  // Submit the file to the server with the JWT token for authentication
  const submitFile = async () => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        // Send a POST request to your backend with the JWT token in the header
        await axios.post('http://localhost:3000/api/uploads', formData, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        });
        alert('File uploaded successfully!');
        setUploadedFile(null);  // Reset file after successful upload
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      }
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>

      {/* Display Exercise Recommendations */}
      <div className="exercise-section">
        <h3>Exercise Recommendations</h3>
        <ul>
          {exerciseRecommendations.length > 0 ? (
            exerciseRecommendations.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))
          ) : (
            <p>No exercise recommendations available.</p>
          )}
        </ul>
      </div>

      {/* Display Meal Plan */}
      <div className="meal-plan-section">
        <h3>Your Meal Plan</h3>
        <ul>
          {mealPlan.length > 0 ? (
            mealPlan.map((meal, index) => (
              <li key={index}>{meal.name}</li>
            ))
          ) : (
            <p>No meal plan available.</p>
          )}
        </ul>
      </div>

      {/* Display Fitness Goals */}
      <div className="goals-section">
        <h3>Your Fitness Goals</h3>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>{goal.text}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a new goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>

      {/* File Upload Section */}
      <div className="upload-section">
        <h3>Upload Your Progress</h3>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={submitFile}>Upload</button>
      </div>
    </div>
  );
};

export default Dashboard;
