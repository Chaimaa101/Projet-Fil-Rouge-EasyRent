import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

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
      setTotal(res.data.total);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
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
      setErrors(error.response?.data?.errors || {});
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
      setErrors(error.response?.data?.errors || {});
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
      toast.success("Brand created successfully");
      return { result: true };
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
      return { result: false };
    } finally {
      setLoading(false);
    }
  };

  const updateBrand = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      data.append("_method", "PUT");
      const res = await api.post(`/brands/${id}`, data);
      toast.success("Brand updated successfully");
      getBrands();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
      return { result: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteBrand = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/brands/${id}`);
      toast.success("Brand deleted successfully");
getBrands()
      return { result: true };
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
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
    <BrandContext.Provider value={values}>{children}</BrandContext.Provider>
  );
};
