import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api'; 
import { useCookies } from 'react-cookie'; 
import './index.module.css';

const Login = ({ setNewUser }) => {
  const nav = useNavigate();  // Hook to navigate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cookies, setCookie] = useCookies(['authToken']);

  // Handle new user registration flow
  const handleClick = () => {
    nav('/signup'); // Navigate to the sign-up page
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Handle form submission and login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setErrors(["Email and Password are required."]);
      return;
    }

    try {
      // Call the login function from your services/api.js
      const response = await login(formData);
      
      // If login is successful, store the token in cookies
      if (response.token) {
        setCookie('authToken', response.token, { path: '/'});  // Set token in cookie for 7 days
        
        // Redirect to the dashboard
        nav('/dashboard');
      } else {
        // Handle failed login (e.g., invalid credentials)
        setErrors(["Invalid credentials."]);
      }

    } catch (err) {
      console.log(err);
      
      // Handle errors from the backend (e.g., network issues)
      setErrors([err.response?.data || 'An error occurred. Please try again.']);
    }

    // Clear errors after 3 seconds
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="forms">
        <h2>Welcome back to ReppUp</h2>
        <h3>Login</h3>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email: </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
          />

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

          <button type="submit">Log In</button>

          <p>
            Need a ReppUp account? <br />
            <a href="#" onClick={() => nav('/signup')}>Create an account</a>
          </p>
        </form>

        {/* Display error messages */}
        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
