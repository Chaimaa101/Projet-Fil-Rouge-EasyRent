import { createContext, useState } from "react";
import api from "../Services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
  currentPage: 1,
  lastPage: 1,
});


//   get  all 
  const getUsers = async (page = 1) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/users/?page=${page}`);
        setUsers(res.data.data);
      setTotal(res.data.total)
      setPagination({
  currentPage: response.data.current_page,
  lastPage: response.data.last_page,
});
    } catch (error) {
      setErrors(error.response?.data || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

//   get one
  
  const getUser = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response?.data || "Error fetching user");
    } finally {
      setLoading(false);
    }
  };


//  updade
  const updateUser = async (id, data) => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await api.put(`/users/${id}`, data);
      setUsers((prev) =>
        prev.map((v) => (v.id === id ? res.data : v))
      );
      setSuccessMessage("User updated successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error updating User");
    } finally {
      setLoading(false);
    }
  };

//   remove
  const deleteUser = async (id) => {
    setLoading(true);
    setErrors(null);
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((v) => v.id !== id));
      setSuccessMessage("User deleted successfully");
    } catch (error) {
      setErrors(error.response?.data || "Error deleting User");
    } finally {
      setLoading(false);
    }
  };

  const values = {
    users,
    user,
    loading,
    errors,
    pagination,
    successMessage,
    total,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    setErrors,
    setSuccessMessage,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};
