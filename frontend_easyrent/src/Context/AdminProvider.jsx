import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [avis, setAvis] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null); 
  const [pagination, setPagination] = useState({
  currentPage: 1,
  lastPage: 1,
});
  const [successMessage, setSuccessMessage] = useState("");

  const getDashboardStats = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
      console.log(res)
    } catch (error) {
      setErrors(error.response?.data || "Error fetching dashboard stats");
    } finally {
      setLoading(false);
    }
  };

   const getAvis = async (page= 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/admin/avis?page=${page}`);
      setAvis(res.data.data);
      setTotal(res.data.total)
       setPagination({
  currentPage: res.data.current_page,
  lastPage: res.data.last_page,
});
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };


  const getPayments = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/admin/paiments?page=${page}`);
        setPayments(res.data.data);
      setTotal(res.data.total)
      setPagination({
  currentPage: response.data.current_page,
  lastPage: response.data.last_page,
});
    } catch (error) {
      setErrors(error.response?.data || "Error fetching Payments");
    } finally {
      setLoading(false);
    }
  };

  const getAllReservations = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/admin/Allreservations?page=${page}`);
      setAllReservations(res.data.data);
       setPagination({
  currentPage: res.data.current_page,
  lastPage: res.data.last_page,
});
    } catch (error) {
      setErrors(error.response?.data || "Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const updateVehiculeStatus = async (id, status) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/updateVehiculeStatus/${id}`, { status });
      setSuccessMessage("Reservation status updated");
      getAllReservations
    } catch (error) {
      setErrors(error.response?.data || "Error updating reservation status");
    } finally {
      setLoading(false);
    }
  };


   const toggleAvisIsPublic = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/admin/avis/${id}/toggle-public`);
      toast.success(" status updated");
      getAvis()

    } catch (error) {
      setErrors(error.response?.data || "Error updating reservation status");
    } finally {
      setLoading(false);
    }
  };




  const values = {
    stats,
    allReservations,
    vehicles,
    loading,
    errors,
    avis,
    payments,
    pagination,
    getAvis,
    getPayments,
    successMessage,
    getDashboardStats,
    toggleAvisIsPublic,
   
    getAllReservations,
    updateVehiculeStatus,
    setErrors,
    setSuccessMessage,
  };

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  );
};
