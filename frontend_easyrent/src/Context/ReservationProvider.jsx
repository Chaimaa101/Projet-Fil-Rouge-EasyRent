import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [reservations, setreservations] = useState([]);
  const [singlereservations, setSinglereservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [total, setTotal] = useState(0);

  const [successMessage, setSuccessMessage] = useState("");

  const getreservations = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/reservations");
      setreservations(res.data);
      setTotal(res.data.total);
    } catch (error) {
      setErrors("Erreur lors de la récupération des réservations");
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
      setErrors(
        error.response?.data || "Erreur lors de la récupération de réservation"
      );
    } finally {
      setLoading(false);
    }
  };

  const createreservations = async (data, id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post(`/reservations/${id}`, data);
      toast.success("reservations ajouté avec succès");
      return { result: true };
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(
          error.response?.data?.message ||
            "Erreur lors de la création de la réservation"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const deletereservations = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/reservations/${id}`);
      toast.success("reservations supprimé avec succès");
    } catch (error) {
      setLoading(false);
    }
  };

  const values = {
    reservations,
    singlereservations,
    loading,
    errors,
    successMessage,
    total,
    getreservations,
    getSinglereservations,
    createreservations,
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
