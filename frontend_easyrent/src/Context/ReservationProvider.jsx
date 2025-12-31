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
      setTotal(res.data.total)
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

  const createreservations = async (data, id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post(`/reservations/${id}`, data);
      toast.success("reservations ajouté avec succès");
      return {result: true}
    } catch (error) {
      setErrors(error.response?.data || "Error creating reservations");
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
      console.log(error)
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
