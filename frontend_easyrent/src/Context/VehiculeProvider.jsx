import { createContext, useState } from "react";
import api from "../Services/api";

export const VehiculeContext = createContext();

export const VehiculeProvider = ({ children }) => {
  const [vehicules, setVehicules] = useState([]);
  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

//   get  all 
  const getVehicules = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/vehicules");
      setVehicules(res.data);
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
      setErrors(error.response?.data || "Error fetching vehicle");
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
      setVehicules((prev) => [...prev, res.data]);
      setSuccessMessage("Vehicle created successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error creating vehicle");
    } finally {
      setLoading(false);
    }
  };

//  updade
  const updateVehicule = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/vehicules/${id}`, data);
      setVehicules((prev) =>
        prev.map((v) => (v.id === id ? res.data : v))
      );
      setSuccessMessage("Vehicle updated successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error updating vehicle");
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
      setVehicules((prev) => prev.filter((v) => v.id !== id));
      setSuccessMessage("Vehicle deleted successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting vehicle");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    vehicules,
    vehicule,
    loading,
    errors,
    successMessage,
    getVehicules,
    getVehicule,
    createVehicule,
    updateVehicule,
    deleteVehicule,
    setErrors,
    setSuccessMessage,
  };

  return (
    <VehiculeContext.Provider value={values}>
      {children}
    </VehiculeContext.Provider>
  );
};
