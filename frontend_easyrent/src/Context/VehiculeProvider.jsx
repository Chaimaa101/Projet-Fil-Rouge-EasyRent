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
    try {
      const res = await api.get(`/vehicules/?page=${page}`);
      setVehicules(res.data.data);
      setTotal(res.data.total)
      setPagination({
  currentPage: res.data.current_page,
  lastPage: res.data.last_page,
});
    } catch (error) {
      setErrors(error.response?.data || "Error fetching vehicles");
    } finally {
      setLoading(false);
    }
  };
// get top vehicule
    const getTopVehicules = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/getTopVehicules`);
      setTopvehicules(res.data)
    } catch (error) {
      setErrors(error.response?.data || "Error fetching vehicles");
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
      setErrors(error.response?.data || "Erreur lors de la récupération du véhicule");
    } finally {
      setLoading(false);
    }
  };

//   store
  const createVehicule = async (data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post("/vehicules", data);
      toast.success("Véhicule créé avec succès");
      getVehicules()
      return {result:true}
    } catch (error) {
      setErrors( error || "Erreur lors de la création du véhicule");
    } finally {
      setLoading(false);
    }
  };

//  updade
  const updateVehicule = async (id, data) => {
  setLoading(true);
  setErrors(null);

  try {
    data.append("_method", "PUT");

    const res = await api.post(`/vehicules/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await getVehicules();

    toast.success("Véhicule modifié avec succès");

    return { result: true, data: res.data };

  } catch (error) {
    if (error.response?.status === 422) {
      setErrors(error.response.data.errors);
      toast.error("Veuillez corriger les erreurs du formulaire");
    } else {
      toast.error("Erreur lors de la modification du véhicule");
    }

    return { result: false };
  } finally {
    setLoading(false);
  }
};


//   remove
  const deleteVehicule = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/vehicules/${id}`);
     getVehicules()
      toast.success("Véhicule supprimé avec succès");
      return {result:true}

    } catch (error) {
if (error.response) {
      if (error.response.status === 403) {
        toast.error("Action non autorisée");
      } else if (error.response.status === 404) {
        toast.error("Véhicule introuvable");
      } else {
        toast.error("Erreur lors de la suppression");
      }

    }
      
      setErrors(error.response.data?.errors || {});
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
  };

  return (
    <VehiculeContext.Provider value={values}>
      {children}
    </VehiculeContext.Provider>
  );
};
