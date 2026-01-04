import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const VehiculeContext = createContext();

export const VehiculeProvider = ({ children }) => {
  const [vehicules, setVehicules] = useState([]);
  const [topvehicules, setTopvehicules] = useState([]);
  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
  });

  //   get  all
const getVehicules = async (page = 1) => {
  setLoading(true);
  setErrors(null);
  
  let isMounted = true; // Add this
  
  try {
    const res = await api.get(`/vehicules/?page=${page}`);
    
    if (isMounted) { // Check before updating state
      setVehicules(res.data.data);
      setTotal(res.data.total);
      setPagination({
        currentPage: res.data.current_page,
        lastPage: res.data.last_page,
      });
    }
  } catch (error) {
    if (isMounted) {
      setErrors("Erreur lors de la récupération des véhicules");
    }
  } finally {
    if (isMounted) {
      setLoading(false);
    }
  }
  
  return () => { isMounted = false; }; // Cleanup function
};
  // get top vehicule
  const getTopVehicules = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/getTopVehicules`);
      setTopvehicules(res.data);
    } catch (error) {

setErrors("Erreur lors de la récupération des véhicules");

    } finally {
      setLoading(false);
    }
  };

  //   get one

  const getVehicule = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/vehicules/${id}`);
      setVehicule(res.data);
    } catch (error) {
      setErrors( "Erreur lors de la récupération du véhicule");
    } finally {
      setLoading(false);
    }
  };


const createVehicule = async (data) => {
  setLoading(true);
  setErrors(null);
  
  try {
    const res = await api.post("/vehicules", data);
    
    toast.success("Véhicule créé avec succès");

   getVehicules()
    
    return { result: true };
  } catch (error) {
    console.error("Create vehicule error:", error);
    
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
      toast.error("Veuillez corriger les erreurs");
    } else {
      toast.error(error?.response?.data?.error || "Erreur serveur");
    }
    return { result: false, error };
  } finally {
    setLoading(false);
  }
};

const updateVehicule = async (id, data) => {
  setLoading(true);
  setErrors(null);
  
  try {

    if (!data.get('_method')) {
      data.append("_method", "PUT");
    }

    const res = await api.post(`/vehicules/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Véhicule modifié avec succès");
    
    getVehicules()

    return { result: true };
  } catch (error) {
    console.error("Update vehicule error:", error);
    
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
      toast.error("Veuillez corriger les erreurs");
    } else {
      toast.error(error?.response?.data?.error || "Erreur serveur");
    }
    return { result: false, error };
  } finally {
    setLoading(false);
  }
};

const deleteVehicule = async (id) => {
  setLoading(true);
  setErrors(null);
  
  try {
    await api.delete(`/vehicules/${id}`);
    
    toast.success("Véhicule supprimé avec succès");
    
    getVehicules()
    
    return { result: true };
  } catch (error) {
    toast.error(error?.response?.data?.error || "Erreur serveur");
    return { result: false, error };
  } finally {
    setLoading(false);
  }
};
     const toggleVehiculeIsTop = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.patch(`/admin/vehicules/${id}/toggle-top`);
      toast.success(" status modifié");
      getVehicules()
    } catch (error) {
      setErrors(error.response?.data || "Error updating reservation status");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    vehicules,
    topvehicules,
    vehicule,
    loading,
    errors,
    pagination,
    total,
    getVehicules,
    getTopVehicules,
    getVehicule,
    createVehicule,
    updateVehicule,
    deleteVehicule,
    setErrors,
    toggleVehiculeIsTop,
  };

  return (
    <VehiculeContext.Provider value={values}>
      {children}
    </VehiculeContext.Provider>
  );
};
