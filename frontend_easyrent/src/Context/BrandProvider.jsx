import { createContext, useState } from "react";
import api from "../Services/api";

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
    const [total, setTotal] = useState(0);


  const getBrands = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/brands");
      setBrands(res.data.marques);
      setTotal(res.data.total)
    } catch (error) {
      setErrors(error.response?.data || "Error fetching Brands");
    } finally {
      setLoading(false);
    }
  };

   const getCategories = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const getBrand = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/brands/${id}`);
      setBrand(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching Brand");
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.post("/brands", data);
      setBrands((prev) => [...prev, res.data]);
      setSuccessMessage("Brand created successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error creating Brand");
    } finally {
      setLoading(false);
    }
  };

  const updateBrand = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/brands/${id}`, data);
      setBrands((prev) =>
        prev.map((m) => (m.id === id ? res.data : m))
      );
      setSuccessMessage("Brand updated successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error updating Brand");
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/brands/${id}`);
      setBrands((prev) => prev.filter((m) => m.id !== id));
      setSuccessMessage("Brand deleted successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting Brand");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    brands,
    brand,
    loading,
    errors,
    categories,
    successMessage,
    total,
    getBrands,
    getCategories,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    setErrors,
    setSuccessMessage,
  };

  return (
    <BrandContext.Provider value={values}>
      {children}
    </BrandContext.Provider>
  );
};
