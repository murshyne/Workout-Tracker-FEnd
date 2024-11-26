import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signup } from '../../services/api';
import styles from './Signup.module.css'; // Import the styles

const SignUp = ({ setNewUser }) => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
    age: '',
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
        nav('/dashboard');
      } catch (err) {
        if (err.response && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors([{ msg: 'Please enter your information to signup.' }]);
        }
      }
    }
  };

  return (
    <div className={styles.forms}>
            <h2>Welcome to ReppUp!</h2>
            <p>Your path to success starts here</p><br />
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

        <label htmlFor="password">Password: </label>
        <div className={styles['password-container']}>
          <input
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            minLength="8"
            className={styles['password-input']}
            value={formData.password}
            onClick={() => {
              setPasswordVisible(true);
              setTimeout(() => setPasswordVisible(false), 1000);
            }}
          />
        </div>

        <label htmlFor="password2">Confirm Password: </label>
        <div className={styles['password-container']}>
          <input
            onChange={handleChange}
            type={password2Visible ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            minLength="8"
            className={styles['password-input']}
            value={formData.password2}
            onClick={() => {
              setPassword2Visible(true);
              setTimeout(() => setPassword2Visible(false), 1000);
            }}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login" className={styles['link-button']}>Login</Link>
      </p>

      {errors.length > 0 && (
        <div className={styles['error-message']}>
          {errors.map((error, index) => (
            <p key={index}>{error.msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignUp;
