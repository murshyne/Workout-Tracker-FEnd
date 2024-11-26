import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Exercise.css';

const Exercises = () => {
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [selectedExerciseGif, setSelectedExerciseGif] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  const bodyParts = ['chest', 'back', 'lower legs', 'upper legs', 'lower arms', 'upper arms', 'shoulders', 'neck', 'waist', 'core', 'cardio'];

  // Function to fetch exercises based on selected filters
  const fetchExerciseRecommendations = async () => {
    const params = {} ;
    if (selectedBodyPart) params.bodyPart = selectedBodyPart;

    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: { 'X-RapidAPI-Key': import.meta.env.VITE_EXERCISEDB_API_KEY },
        params,
      });
      let exercises = response.data.slice(0, 5); // Limit to 5 recommendations
      setExerciseRecommendations(exercises); // Update state with fetched exercises
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  // Handle the "Go" button click
  const handleSortApply = () => {
    fetchExerciseRecommendations(); // Fetch exercises with applied filters and sorting
  };

  return (
    <div className="exercise-section">
      <h3 className="exercise-title">Exercise Recommendations</h3>

      {/* Dropdowns for filters */}
      <div className="filter-container">
        <label htmlFor="bodyPartSelect">Select Body Part:</label>
        <select 
          id="bodyPartSelect"
          onChange={(e) => setSelectedBodyPart(e.target.value)} 
          value={selectedBodyPart}
          className="dropdown"
        >
          <option value="">-- Select Body Part --</option>
          {bodyParts.map((part, index) => <option key={index} value={part}>{part}</option>)}
        </select>
      </div>

      {/* Go Button */}
      <button className="go-button" onClick={handleSortApply}>Go</button>

      {/* Exercise Recommendations List */}
      <ul className="exercise-list">
        {exerciseRecommendations.length ? (
          exerciseRecommendations.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <h4>{exercise.name}</h4>
              {/* Check if an image URL exists, and use it for the exercise */}
              {exercise.image_url && (
                <div className="exercise-image">
                  <img 
                    src={`https://exercisedb-api.vercel.app/api/v1/images/${exercise.image_url}`} 
                    alt={exercise.name} 
                    width="400" 
                    height="300" 
                  />
                </div>
              )}
              <a href="#!" onClick={() => setSelectedExerciseGif(exercise.gifUrl)} className="exercise-link">View Exercise Animation</a>
            </li>
          ))
        ) : (
          <p>No exercises found. Try adjusting the filters.</p>
        )}
      </ul>

      {/* Display selected GIF */}
      {selectedExerciseGif && (
        <div className="exercise-gif">
          <h4>How to Do This Exercise:</h4>
          <iframe 
            src={selectedExerciseGif} 
            width="500" 
            height="500" 
            title="Exercise GIF" 
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Exercises;
