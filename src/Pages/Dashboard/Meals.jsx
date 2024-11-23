// Meals.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Meals = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [mealQuery, setMealQuery] = useState('');

  const fetchMealPlan = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: { apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY, query, number: 4 },
      });
      setMealPlan(response.data.results);
    } catch (err) {
      console.error('Error fetching meal plan:', err);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') fetchMealPlan(mealQuery);
  };

  return (
    <div className="meal-section">
      <h3>Search for Meals</h3>
      <div>
        <input
          type="text"
          placeholder="Enter meal: e.g., Chicken"
          value={mealQuery}
          onChange={(e) => setMealQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={() => fetchMealPlan(mealQuery)}>Search</button>
      </div>

      <div>
        {/* <h3>Meal Plan</h3> */}
        {mealPlan.length ? (
          mealPlan.map((meal, index) => (
            <div key={index}>
              <h4>{meal.title}</h4>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(meal.title)} recipe`} target="_blank" rel="noopener noreferrer">
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p>No meal plan available. Try again later!</p>
        )}
      </div>
    </div>
  );
};

export default Meals;
