import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/api'; 
import './Signup.module.css'; 

const SignUp = ({ setNewUser }) => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    gender: '',    // New gender field
    age: '',       // New age field
  });

  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const handleClick = () => {
    nav('/login'); 
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setErrors([{ msg: "Passwords do not match" }]);
    } else {
      try {
        await signup(formData); 
        // Navigate to dashboard after successful signup
        nav('/dashboard'); 
      } catch (err) {
        // Check if the error response contains a message
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([{ msg: 'An unexpected error occurred.' }]);
        }
      }
    }
  };

  return (
    <div className="forms">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="firstName">First Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
        />
        
        <label htmlFor="lastName">Last Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
        />

        <label htmlFor="email">Email: </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
        />

        {/* Gender Field */}
        <label htmlFor="gender">Gender: </label>
        <select
          onChange={handleChange}
          id="gender"
          name="gender"
          value={formData.gender}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* Age Field */}
        <label htmlFor="age">Age: </label>
        <input
          onChange={handleChange}
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          min="0"
          max="120"
          value={formData.age}
        />

        {/* Password Field with Visibility Toggle */}
        <label htmlFor="password">Password: </label>
        <div className="password-container">
          <input
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            minLength="8"
            className="password-input"
            value={formData.password}
            onClick={() => {
              setPasswordVisible(true);
              setTimeout(() => setPasswordVisible(false), 1000); // Reveal and hide after 1 second
            }}
          />
        </div>

        {/* Confirm Password Field with Visibility Toggle */}
        <label htmlFor="password2">Confirm Password: </label>
        <div className="password-container">
          <input
            onChange={handleChange}
            type={password2Visible ? "text" : "password"}
            id="password2" 
            name="password2"
            placeholder="Confirm Password"
            minLength="8"
            className="password-input"
            value={formData.password2}
            onClick={() => {
              setPassword2Visible(true);
              setTimeout(() => setPassword2Visible(false), 1000); // Reveal and hide after 1 second
            }}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
      
      <p>
        Already have an account? 
        <button onClick={handleClick} className="link-button">
          Log In
        </button>
      </p>
      
      {errors.length > 0 && (
        <div className="error-message">
          {errors.map((error, index) => (
            <p key={index}>{error.msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignUp;
