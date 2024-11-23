import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';

// Dynamically import Login and Signup components
const Login = React.lazy(() => import('../Login/Login'));
const Signup = React.lazy(() => import('../Signup/Signup'));

const Home = () => {
  const [formType, setFormType] = useState('login');  // Track which form to display

  const handleToggleForm = (type) => {
    setFormType(type);  // Switch between login and signup
  };

  return (
    <div className="home-page">
      <div className="left-section">
        <div className="welcome-message">
          <h1>Welcome to ReppUp!</h1>
          <p>Your path to success starts here</p>
        </div>
      </div>
      
      <div className="right-section">
        <div className="form-container">
          {/* <h2>{formType === 'login' ? 'Login to your account' : 'Create a new account'}</h2> */}
          
          {/* Suspense is used to handle dynamic import */}
          <Suspense fallback={<div>Loading...</div>}>
            {formType === 'login' ? (
              <Login />
            ) : (
              <Signup />
            )}
          </Suspense>
          
          <div className="form-toggle">
            <p>
              {formType === 'login' ? (
                <>
                  
                 
                </>
              ) : (
                <>
                  Already have an account? 
                  <Link to="/login" onClick={() => handleToggleForm('login')}>Login</Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
