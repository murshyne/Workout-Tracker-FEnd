import { createContext, useContext, useMemo, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken", "firstName"]);

  useEffect(() => {
    // Check if token exists in cookies
    if (cookies.authToken) {
      // You could call an API to verify the token here if needed
    }
  }, [cookies.authToken]);

  const login = async (formData) => {
      let res = await axios({
        method: 'POST',
          url: 'http://localhost:3000/api/auth',
          data: formData,
      });

      setCookie('token', res.data.token);
  };

  const signUp = async (formData) => {
    try {
      let res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/auth/login',
        data: formData,
      });

      // Set cookies with expiration date of 1 hour
      setCookie('authToken', res.data.token, { path: '/', maxAge: 3600 });
      setCookie('firstName', res.data.firstName, { path: '/', maxAge: 3600 });
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    ['authToken', 'firstName'].forEach((cookie) => {
      removeCookie(cookie, { path: '/' }); // Ensuring cookies are removed
    });
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

  // Cheeky function to minimize imports on others components
export function useAuth() {
  return useContext(AuthContext);
}
