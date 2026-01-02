import { createContext, useState } from "react";
import api from "../Services/api";
import { getEasingForSegment } from "framer-motion";
import toast from "react-hot-toast";

export const AvisContext = createContext();

export const AvisProvider = ({ children }) => {
  const [publicAvis, setPublicAvis] = useState([]);
const [mesAvis, setMesAvis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);



  const getPublicAvis = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/getPublicAvis");
      setPublicAvis(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };
    const getMesAvis = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/avis");
      setMesAvis(res.data);
      setTotal(res.data.total)
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };




  const createAvis = async (data, id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post(`/avis/${id}`, data);
      toast.success("Avis ajouté avec succès");
      getMesAvis()
      return {result : true}
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error creating avis");
      setErrors(error?.response?.data?.message)
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
      toast.succes("Avis mis à jour avec succès");
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
      toast.success("Avis supprimé avec succès");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting avis");
    } finally {
      setLoading(false);
    }
  };
  

  const values = {
    mesAvis,
    publicAvis,
    loading,
    errors,
    successMessage,
    total,
    getMesAvis,
    getPublicAvis,
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
