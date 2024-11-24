import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercises = () => {
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [selectedExerciseGif, setSelectedExerciseGif] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const bodyParts = ['chest', 'back', 'lower legs', 'upper legs', 'lower arms', 'upper arms', 'shoulders', 'neck', 'waist', 'core', 'cardio'];
  const equipment = ["assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer"];
  const targets = ["abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes"];
  const difficulties = ["easy", "medium", "hard"]; // Difficulty levels

  // Function to fetch exercises based on selected filters
  const fetchExerciseRecommendations = async () => {
    const params = {};
    if (selectedBodyPart) params.bodyPart = selectedBodyPart;
    if (selectedEquipment) params.equipment = selectedEquipment;
    if (selectedTarget) params.target = selectedTarget;
    if (selectedDifficulty) params.difficulty = selectedDifficulty; // Include difficulty in the filters

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
      <h3>Exercise Recommendations</h3>

      {/* Dropdowns for filters */}
      <div>
        <label>Select Body Part:</label>
        <select onChange={(e) => setSelectedBodyPart(e.target.value)} value={selectedBodyPart}>
          <option value="">-- Select Body Part --</option>
          {bodyParts.map((part, index) => <option key={index} value={part}>{part}</option>)}
        </select>
      </div>

      <div>
        <label>Select Equipment:</label>
        <select onChange={(e) => setSelectedEquipment(e.target.value)} value={selectedEquipment}>
          <option value="">-- Select Equipment --</option>
          {equipment.map((eq, index) => <option key={index} value={eq}>{eq}</option>)}
        </select>
      </div>

      <div>
        <label>Select Target:</label>
        <select onChange={(e) => setSelectedTarget(e.target.value)} value={selectedTarget}>
          <option value="">-- Select Target --</option>
          {targets.map((target, index) => <option key={index} value={target}>{target}</option>)}
        </select>
      </div>

      <div>
        <label>Select Difficulty:</label>
        <select onChange={(e) => setSelectedDifficulty(e.target.value)} value={selectedDifficulty}>
          <option value="">-- Select Difficulty --</option>
          {difficulties.map((level, index) => <option key={index} value={level}>{level}</option>)}
        </select>
      </div>

      {/* Go Button */}
      <button onClick={handleSortApply}>Go</button>

      {/* Exercise Recommendations List */}
      <ul>
        {exerciseRecommendations.length ? (
          exerciseRecommendations.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <h4>{exercise.name}</h4>
              {/* Check if an image URL exists, and use it for the exercise */}
              {exercise.image_url && (
                <div>
                  <img 
                    src={`https://exercisedb-api.vercel.app/api/v1/images/${exercise.image_url}`} 
                    alt={exercise.name} 
                    width="400" 
                    height="300" 
                  />
                </div>
              )}
              <p><strong>Target: </strong>{exercise.target}</p>
              <p><strong>Body Part: </strong>{exercise.bodyPart}</p>
              <a href="#!" onClick={() => setSelectedExerciseGif(exercise.gifUrl)}>View Exercise Animation</a>
            </li>
          ))
        ) : (
          <p>No exercises found. Try adjusting the filters.</p>
        )}
      </ul>

      {/* Display selected GIF */}
      {selectedExerciseGif && (
        <div>
          <h4>How to Do This Exercise:</h4>
          <iframe src={selectedExerciseGif} width="400" height="300" title="Exercise GIF" frameBorder="0" allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
};

export default Exercises;
