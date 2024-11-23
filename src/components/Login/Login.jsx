import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../../services/api';  // Assuming this is your login API service
import './index.module.css';

const Login = ({ setNewUser }) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cookies, setCookie] = useCookies(['authToken', 'firstName']);  // Store token and firstName in cookies

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
      const response = await login(formData);  // This should return both token and firstName

      // If login is successful, store both token and firstName in cookies
      if (response.token) {
        //Security: Storing sensitive data like authToken in cookies is common, but ensure the cookies are marked as "HttpOnly" and "Secure" (if using HTTPS) for enhanced security in production. 
        setCookie('authToken', response.token, { path: '/', secure: true, httpOnly: true });
  // Store token in cookie
        setCookie('firstName', response.firstName, { path: '/' });  // Store firstName in cookie

        // Redirect to the dashboard
        nav('/dashboard');
      } else {
        // Handle failed login (e.g., invalid credentials)
        setErrors(["Invalid credentials."]);
      }

    } catch (err) {
      console.log(err);
      
      // Handle errors from the backend (e.g., network issues)
      setErrors([err.response?.data || 'Invalid credentials. Please try again.']);
    }

    // Clear errors after 3 seconds
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  return (
    <div className="login-page">
      <div className="forms">
        <h3>Login to your account</h3>

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
