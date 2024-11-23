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

  // API Keys and URLs
  const SPOONACULAR_API_KEY = '5510681e62db4ee6a3f347ebe787fa47';  // Replace with your Spoonacular API key
  const WGER_API_URL = 'https://wger.de/api/v2/exercise/';  // Wger API URL for exercises

  // Fetch Exercise Recommendations from Wger API
  const fetchExerciseRecommendations = async () => {
    try {
      const response = await axios.get(WGER_API_URL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setExerciseRecommendations(response.data.results);  // Store exercise recommendations
      console.log('Exercise Recommendations:', response.data.results);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  // Fetch Meal Plan from Spoonacular API
  const fetchMealPlan = async () => {
    try {
      const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          timeFrame: 'day',  // Can use 'day' or 'week'
          targetCalories: 2000,  // Optional: Set calorie target
        },
      });
      setMealPlan(response.data.meals);  // Store meal plan
      console.log('Meal Plan:', response.data.meals);
    } catch (err) {
      console.error('Error fetching meal plan:', err);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    if (cookies.authToken) {
      fetchExerciseRecommendations();
      fetchMealPlan();
    }
  }, [cookies.authToken]);  // Only re-fetch when authToken changes

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
        await axios.post('http://localhost:3000/api/uploads', formData, {
          headers: {
            Authorization: `Bearer ${cookies.authToken}`,
          },
        });
        alert('File uploaded successfully!');
        setUploadedFile(null); // Reset file after upload
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
              <li key={index}>{meal.title}</li>
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
