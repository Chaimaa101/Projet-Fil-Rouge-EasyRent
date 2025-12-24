import { createContext, useState } from "react";
import api from "../Services/api";

export const AvisContext = createContext();

export const AvisProvider = ({ children }) => {
  const [avis, setAvis] = useState([]);
  const [singleAvis, setSingleAvis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);



  const getAvis = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/avis");
      setAvis(res.data.data);
      setTotal(res.data.total)
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };


  const getSingleAvis = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/avis/${id}`);
      setSingleAvis(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };


  const createAvis = async (data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post("/avis", data);
      setAvis((prev) => [...prev, res.data]);
      setSuccessMessage("Avis ajouté avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error creating avis");
    } finally {
      setLoading(false);
    }
  };

  const updateAvis = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/avis/${id}`, data);
      setAvis((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
      setSuccessMessage("Avis mis à jour avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error updating avis");
    } finally {
      setLoading(false);
    }
  };

  const deleteAvis = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/avis/${id}`);
      setAvis((prev) => prev.filter((a) => a.id !== id));
      setSuccessMessage("Avis supprimé avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting avis");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    avis,
    singleAvis,
    loading,
    errors,
    successMessage,
    total,
    getAvis,
    getSingleAvis,
    createAvis,
    updateAvis,
    deleteAvis,
    setErrors,
    setSuccessMessage,
  };

  return (
    <AvisContext.Provider value={values}>
      {children}
    </AvisContext.Provider>
  );
};
