import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

export default function UserRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

   return user ? <Outlet /> : <Navigate to="/login" replace />;
}
