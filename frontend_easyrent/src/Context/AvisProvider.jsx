import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const AvisContext = createContext();

export const AvisProvider = ({ children }) => {
  const [publicAvis, setPublicAvis] = useState([]);
  const [mesAvis, setMesAvis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
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
      setTotal(res.data.total);
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
      getMesAvis();
      return { result: true };
    } catch (error) {
       
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
      toast.error("Veuillez corriger les erreurs");
    } else {
      toast.error(error?.response?.data?.error || "Erreur serveur");
    }
  
    } finally {
      setLoading(false);
    }
  };

  const updateAvis = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/avis/${id}`, data);
      toast.success("Avis mis à jour avec succès");
      getMesAvis();
      return { result: true };
    } catch (error) {
       
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
      toast.error("Veuillez corriger les erreurs");
    } else {
      toast.error(error?.response?.data?.error || "Erreur serveur");
    }
    } finally {
      setLoading(false);
    }
  };

  const deleteAvis = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/avis/${id}`);
      toast.success("Avis supprimé avec succès");
      getMesAvis()
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
    total,
    getMesAvis,
    getPublicAvis,
    createAvis,
    updateAvis,
    deleteAvis,
    setErrors,
  };

  return <AvisContext.Provider value={values}>{children}</AvisContext.Provider>;
};
