import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import { Link } from 'react-router-dom'; // add this import for Link component
import { useCookies } from 'react-cookie';
import { login } from '../../services/api';
import './index.module.css';

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [cookies, setCookie] = useCookies(['authToken', 'firstName']);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    if (e.target.name === 'password') {
      setPasswordLength(e.target.value.length);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors(["Email and Password are required."]);
      return;
    }

    try {
      const response = await login(formData);
      if (response.token) {
        setCookie('authToken', response.token, { path: '/', secure: true, httpOnly: true });
        setCookie('firstName', response.firstName, { path: '/' });
        nav('/dashboard');
      } else {
        setErrors(["Invalid credentials."]);
      }
    } catch (err) {
      console.log(err);
      setErrors([err.response?.data || 'Invalid credentials. Please try again.']);
    }

    setTimeout(() => {
      setErrors([]);
    }, 3000);
  };

  return (
    <div className="login-page">
      <h2>Welcome to ReppUp!</h2>
      <p>Your path to success starts here</p><br /><br />
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
              setTimeout(() => setPasswordVisible(false), 1500); // Reveal and hide after 1.5 second
            }}
          />
        </div>

        <button type="submit">Log In</button>
      </form>

      {errors.length > 0 && (
        <div className="error-message">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="form-toggle">
        <p>
          Need a ReppUp account?{' '}
          <Link to="/signup" className="link-button">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
