import { createContext, useState } from "react";
import api from "../Services/api";

export const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [reservations, setreservations] = useState([]);
  const [singlereservations, setSinglereservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


  const getreservations = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/reservations");
      setreservations(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const getSinglereservations = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/reservations/${id}`);
      setSinglereservations(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const createreservations = async (data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post("/reservations", data);
      setreservations((prev) => [...prev, res.data]);
      setSuccessMessage("reservations ajouté avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error creating reservations");
    } finally {
      setLoading(false);
    }
  };

  const updatereservations = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/reservations/${id}`, data);
      setreservations((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
      setSuccessMessage("reservations mis à jour avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error updating reservations");
    } finally {
      setLoading(false);
    }
  };

  const deletereservations = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/reservations/${id}`);
      setreservations((prev) => prev.filter((a) => a.id !== id));
      setSuccessMessage("reservations supprimé avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting reservations");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    reservations,
    singlereservations,
    loading,
    errors,
    successMessage,
    getreservations,
    getSinglereservations,
    createreservations,
    updatereservations,
    deletereservations,
    setErrors,
    setSuccessMessage,
  };

  return (
    <ReservationsContext.Provider value={values}>
      {children}
    </ReservationsContext.Provider>
  );
};
