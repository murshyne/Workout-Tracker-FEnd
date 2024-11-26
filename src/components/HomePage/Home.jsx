import React, { Suspense, useState } from 'react';
import './Home.module.css';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup';

// Dynamically import Login and Signup components
// const Login = React.lazy(() => import('../Login/Login'));
// const Signup = React.lazy(() => import('../Signup/Signup'));

const Home = () => {
  const [formType, setFormType] = useState('login');  // Track which form to display

  return (
    <div className="home-page">
      
      <div className="left-section">
              <div className="welcome-message">
          {/* <h2>Welcome to ReppUp!</h2> */}
          {/* <p>Your path to success starts here</p><br /><br /> */}
        </div>
      </div>

      <div className="right-section">
        <div className="form-container">
          <Suspense fallback={<div>Loading...</div>}>
            {formType === 'login' ? (
              <Login setFormType={setFormType} />
            ) : (
              <SignUp setFormType={setFormType} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
