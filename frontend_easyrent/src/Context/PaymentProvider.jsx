import { createContext, useState } from "react";
import api from "../Services/api";
import toast from "react-hot-toast";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  //   get  all
  const getPayments = async () => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/getUserPaiments`);
      setPayments(res.data);
    } catch (error) {
      setErrors("Erreur lors de la récupération des Payments");
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/payments/${id}`);
      toast.success("Paiement supprimé avec succès");
      getPayments();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

const downloadInvoice = async (id) => {
  try {
    const res = await api.get(
      `/invoices/${id}/download`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice-${id}.pdf`);

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error(err);
  }
};

  const values = {
    payments,
    loading,
    errors,
    getPayments,
    downloadInvoice,
    deletePayment,
    setErrors,
  };

  return (
    <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
  );
};
