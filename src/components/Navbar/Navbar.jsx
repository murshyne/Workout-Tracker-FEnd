import './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';  // Using cookies to manage authentication token

const Navbar = () => {
  const [cookies, , removeCookie] = useCookies(['authToken']);  // Get and remove cookies
  const navigate = useNavigate();  // For programmatic navigation

  // Handle Logout action
  const handleLogout = () => {
    removeCookie('authToken');  // Remove the authToken cookie on logout
    navigate('/login');  // Redirect to login page after logging out
  };

  return (
    <nav className="navbar">
      <div className="logo">Reppup</div>
      <div className="nav-links">
        {cookies.authToken ? (
          // If logged in, show Logout button
          <button onClick={handleLogout}>Logout</button>
        ) : (
          // If not logged in, show Login and Signup buttons
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
