// import './Navbar.module.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';  // Using cookies to manage authentication token

// const Navbar = () => {
//   const [cookies, setCookie, removeCookie] = useCookies(['authToken']);  // Get and remove cookies
//   const navigate = useNavigate();  // For programmatic navigation

//   // Handle Logout action
//   const handleLogout = () => {
//     removeCookie('authToken', { path: '/' });  // Remove the authToken cookie on logout
//     navigate('/login');  // Redirect to login page after logging out
//   };

//   // Check if the authToken cookie exists and is valid
//   const isLoggedIn = cookies.authToken;

//   // Optionally, set the cookie with expiry date when the user logs in
//   const handleLogin = () => {
//     // Set cookie with expiry (example: 1 day)
//     setCookie('authToken', 'your-token-here', { path: '/', maxAge: 86400 });  // maxAge in seconds (86400s = 1 day)
//     navigate('/home');  // Navigate after login
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo"><h1>Reppup</h1></div>
//       <div className="nav-links">
//         {isLoggedIn ? (
//           // If logged in, show Logout button
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         ) : (
//           // If not logged in, show Login and Signup buttons
//           <>
//             <Link className="nav-link" to="/login"><button>Login</button></Link>
//             <Link className="nav-link" to="/signup"><button>Signup</button></Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
