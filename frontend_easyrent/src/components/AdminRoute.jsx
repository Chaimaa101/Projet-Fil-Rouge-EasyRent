import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";


export default function AdminRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return user && user.role === "admin"
    ? <Outlet />
    : <Navigate to="/" replace />;
}
