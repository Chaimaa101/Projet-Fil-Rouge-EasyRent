import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [avis, setAvis] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null); 
  const [pagination, setPagination] = useState({
  currentPage: 1,
  lastPage: 1,
});

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

   const getAvis = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/admin/avis`);
      setAvis(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching avis");
    } finally {
      setLoading(false);
    }
  };


  const getPayments = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/admin/paiments`);
        setPayments(res.data);
     
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


   const toggleAvisIsPublic = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.patch(`/admin/avis/${id}/toggle-public`);
      toast.success(" status updated");
      getAvis()

    } catch (error) {
      console.log(error)
      setErrors(error.response?.data || "Error updating reservation status");
    } finally {
      setLoading(false);
    }
  };




  const values = {
    stats,
    allReservations,
    loading,
    errors,
    avis,
    payments,
    pagination,
    getAvis,
    getPayments,
    getDashboardStats,
    toggleAvisIsPublic,
    getAllReservations,
    setErrors,

  };

  return (
    <AdminContext.Provider value={values}>
      {children}
    </AdminContext.Provider>
  );
};
