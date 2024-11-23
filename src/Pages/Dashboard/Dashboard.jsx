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
  const [mealQuery, setMealQuery] = useState('');
  const [cookies] = useCookies(['authToken']);

  const EXERCISEDB_API_URL = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/all';
  const EXERCISEDB_API_HEADERS = {
    'X-RapidAPI-Key': import.meta.env.VITE_EXERCISEDB_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  };
  

  const SPOONACULAR_API_URL = 'https://api.spoonacular.com/recipes/complexSearch'; 
  const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // Fetch Exercise Recommendations
  const fetchExerciseRecommendations = async () => {
    try {
      const response = await axios.get(EXERCISEDB_API_URL, { headers: EXERCISEDB_API_HEADERS });
      setExerciseRecommendations(response.data.slice(0, 10)); // Limit to 10 exercises
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  // Fetch Meal Plan based on query
  const fetchMealPlan = async (query = '') => {
    if (!query) {
      return;
    }
    try {
      const response = await axios.get(SPOONACULAR_API_URL, {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          query: query, 
          number: 3, // Limit results to 3 for simplicity
        },
      });
      setMealPlan(response.data.results); // Save the meal plan response
    } catch (err) {
      console.error('Error fetching meal plan:', err);
    }
  };

  // Add a new fitness goal
  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: goals.length + 1, text: newGoal }]);
      setNewGoal('');
    }
  };

  // Handle search on Enter key press
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchMealPlan(mealQuery); // Trigger meal plan fetch based on the search query
    }
  };

  // Handle search on button click
  const handleSearchClick = () => {
    fetchMealPlan(mealQuery); // Trigger meal plan fetch based on the search query
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  // Submit file to server
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
        setUploadedFile(null); // Reset file input
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (cookies.authToken) {
      fetchMealPlan(mealQuery); // Fetch meal plan when logged in
      fetchExerciseRecommendations(); // Fetch exercise recommendations on load
    }
  }, [cookies.authToken]);

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>

      {/* Exercise Recommendations */}
      <div className="exercise-section">
        <h3>Exercise Recommendations</h3>
        <ul>
          {exerciseRecommendations.length ? (
            exerciseRecommendations.map((exercise, index) => (
              <li key={index}>{exercise.name}</li>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </ul>
      </div>

      {/* Meal Search Section */}
      <div className="meal-search-section">
        <h3>Search for Meals</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter meal: e.g., Chicken"
            value={mealQuery}
            onChange={(e) => setMealQuery(e.target.value)} 
            onKeyDown={handleSearch} 
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>

      {/* Display Meal Plan */}
      <div className="meal-plan-section">
        <h3>Meal Plan</h3>
        {mealPlan.length ? (
          <div>
            {mealPlan.map((meal, index) => (
              <div key={index}>
                <h4>{meal.title}</h4>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(meal.title + " recipe")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No meal plan available. Try again later!</p>
        )}
      </div>

      {/* Fitness Goals */}
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
