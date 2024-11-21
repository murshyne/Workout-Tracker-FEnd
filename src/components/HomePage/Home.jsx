// Home.jsx (Updated for layout)
import React from "react";
import './Home.module.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="left-section">
        <h1>Welcome to ReppUp</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod euismod urna a interdum. Phasellus consectetur velit vel augue feugiat, et iaculis elit tincidunt.
        </p>
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form>
          <label>Email: </label>
          <input type="email" />
          <label>Password: </label>
          <input type="password" />
          <button type="submit">Log In</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Home;
