import { createContext, useState } from "react";
import api from "../Services/api";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
  currentPage: 1,
  lastPage: 1,
});


//   get  all 
  const getPayments = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/payments/?page=${page}`);
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

  const deletePayment = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/payments/${id}`);
      setSuccessMessage("Payment deleted successfully");
      getPayments()
    } catch (error) {
      setErrors(error.response?.data || "Error deleting Payment");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    payments,
    loading,
    errors,
    pagination,
    successMessage,
    total,
    getPayments,
    deletePayment,
    setErrors,
    setSuccessMessage,
  };

  return (
    <PaymentContext.Provider value={values}>
      {children}
    </PaymentContext.Provider>
  );
};
