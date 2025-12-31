import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");


//   get  all 
  const getPayments = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/getUserPaiments`);
        setPayments(res.data);
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
      toast.success("Payment deleted successfully");
      getPayments()
    } catch (error) {
      setErrors(error.response?.data || "Error deleting Payment");
    } finally {
      setLoading(false);
    }
  };

    const viewInvoice = (reservationId) => {
    window.open(
      `http://localhost:8000/api/reservations/${reservationId}/invoice`,
      "_blank"
    );
  };

  const downloadInvoice = (reservationId) => {
    window.open(
      `http://localhost:8000/api/reservations/${reservationId}/invoice/download`,
      "_blank"
    );
  };

  const values = {
    payments,
    loading,
    errors,
    successMessage,
    getPayments,
    viewInvoice,
    downloadInvoice,
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
