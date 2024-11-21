import AuthProvider from './auth/auth_context';

//All contexts will be nested here to consolidate
export default function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}