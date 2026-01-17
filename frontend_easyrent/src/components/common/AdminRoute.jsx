import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

export default function AdminRoute() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  return user && user.role === "admin"
    ? <Outlet />
    : <Navigate to="/admin/dashboard" replace />;
}
