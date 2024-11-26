# ReppUp - Fitness Companion

### Backend Github Link  
[Workout Tracker Backend](https://github.com/murshyne/Workout-Tracker-BEnd.git)

ReppUp is an all-in-one fitness app designed to help users stay on track with their health and wellness journey. Whether you're a beginner or an experienced fitness enthusiast, ReppUp offers personalized workout recommendations, interactive meal planning, and goal tracking features to ensure you achieve your fitness aspirations.

## Features

- **User Authentication**: Secure login and signup with form validation.
- **Dashboard**: Personalized dashboard where users can set and track their fitness goals.
- **Exercise Recommendations**: Get exercise recommendations based on body part selection.
- **Meal Planning**: Search for and view meal recipes based on a search query.
- **File Upload**: Upload files to the backend.
- **Profile Management**: Delete user profiles and manage session cookies.

## Tech Stack

- **Frontend**: React.js
- **State Management**: React's `useState` and `useEffect` hooks
- **API Integration**:
  - Exercise recommendations via [ExerciseDB API](https://rapidapi.com/Exercisedb/api/exercisedb)
  - Meal plan search via [Spoonacular API](https://spoonacular.com/food-api)
- **Routing**: React Router (`react-router-dom`)
- **Cookies**: `react-cookie` for session management
- **CSS**: Custom styling using standard CSS for layout and design

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/reppup.git
cd reppup


## Components Overview

### Login Component (`Login.js`)

Handles user authentication with fields for email and password. It includes validation, password visibility toggle, and integrates with the login API to authenticate users.

### SignUp Component (`SignUp.js`)

Handles user registration with fields for first name, last name, email, password, gender, and age. It includes password validation and ensures both passwords match before submission.

### Dashboard Component (`Dashboard.js`)

A user dashboard displaying personalized fitness goals, meal plans, and exercise recommendations. Allows users to log out, upload files, and manage their profiles.

### Exercises Component (`Exercises.js`)

Displays a list of exercise recommendations based on the selected body part. Each exercise includes an image, description, and a gif showing how to perform the exercise.

### Meals Component (`Meals.js`)

Displays a list of meal recipes based on user search input. Each meal shows the title, image, and a link to the recipe.

## API Integration

### ExerciseDB API

The app uses the ExerciseDB API to fetch exercise recommendations based on the body part selected by the user. The API is integrated into the `Exercises.js` component, and the list is filtered based on the user's input.

### Spoonacular API

The app uses the Spoonacular API to fetch meal recommendations based on a search query. The `Meals.js` component calls this API when the user types a query (e.g., "Chicken") and presses Enter or clicks "Search".

## Styling

The app uses standard CSS for styling, with custom class names defined in each component's CSS file. The CSS files are imported into the respective React components.

## Error Handling

- If an API call fails, the app will display an appropriate error message to the user.
- On form submission errors (e.g., invalid login credentials, mismatched passwords), an error message will be shown in the respective section.
