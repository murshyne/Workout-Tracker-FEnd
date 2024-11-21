import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/auth_context";

export default function ProtectedRoutes() {
    const { cookies } = useAuth();
    return cookies.token ? <Outlet /> : <><Navigate to="/login" /><h1>You are not Authorized to View</h1></>
    ;
}