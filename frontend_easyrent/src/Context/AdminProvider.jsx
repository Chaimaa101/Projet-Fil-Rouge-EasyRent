import { createContext, useState } from "react";
import api from "../Services/api";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getDashboardStats = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching dashboard stats");
    } finally {
      setLoading(false);
    }
  };


  const getUsers = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccessMessage("User deleted successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  const getAllReservations = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/admin/reservations");
      setReservations(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, status) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/admin/reservations/${id}/status`, { status });
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? res.data : r))
      );
      setSuccessMessage("Reservation status updated");
    } catch (error) {
      setErrors(error.response?.data || "Error updating reservation status");
    } finally {
      setLoading(false);
    }
  };


  const values = {
    stats,
    users,
    reservations,
    vehicles,
    loading,
    errors,
    successMessage,
    getDashboardStats,
    getUsers,
    deleteUser,
    getAllReservations,
    updateReservationStatus,
    setErrors,
    setSuccessMessage,
  };

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  );
};
