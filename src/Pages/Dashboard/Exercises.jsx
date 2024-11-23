// Exercises.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercises = () => {
  const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
  const [selectedExerciseGif, setSelectedExerciseGif] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  const bodyParts = ['chest', 'back', 'lower legs', 'upper legs', 'Lower arms', 'upper arms', 'shoulders', 'neck', 'waist', 'core', 'cardio'];
  const equipment = ["assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer"];
  const targets = ["abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes"];

  const fetchExerciseRecommendations = async () => {
    const params = {};
    if (selectedBodyPart) params.bodyPart = selectedBodyPart;
    if (selectedEquipment) params.equipment = selectedEquipment;
    if (selectedTarget) params.target = selectedTarget;

    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
        headers: { 'X-RapidAPI-Key': import.meta.env.VITE_EXERCISEDB_API_KEY },
        params,
      });
      setExerciseRecommendations(response.data.slice(0, 10));
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

  useEffect(() => {
    fetchExerciseRecommendations();
  }, [selectedBodyPart, selectedEquipment, selectedTarget]);

  return (
    <div className="exercise-section">
      <h3>Exercise Recommendations</h3>
      {/* Dropdowns for sorting */}
      <div>
        <label>Select Body Part:</label>
        <select onChange={(e) => setSelectedBodyPart(e.target.value)}>
          <option value="">-- Select Body Part --</option>
          {bodyParts.map((part, index) => <option key={index} value={part}>{part}</option>)}
        </select>
      </div>
      <div>
        <label>Select Equipment:</label>
        <select onChange={(e) => setSelectedEquipment(e.target.value)}>
          <option value="">-- Select Equipment --</option>
          {equipment.map((eq, index) => <option key={index} value={eq}>{eq}</option>)}
        </select>
      </div>
      <div>
        <label>Select Target:</label>
        <select onChange={(e) => setSelectedTarget(e.target.value)}>
          <option value="">-- Select Target --</option>
          {targets.map((target, index) => <option key={index} value={target}>{target}</option>)}
        </select>
      </div>

      <ul>
        {exerciseRecommendations.map((exercise, index) => (
          <li key={index}>
            <a href="#!" onClick={() => setSelectedExerciseGif(exercise.gifUrl)}>{exercise.name}</a>
          </li>
        ))}
      </ul>

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
