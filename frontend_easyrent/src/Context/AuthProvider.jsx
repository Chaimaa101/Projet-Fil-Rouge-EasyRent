import { createContext, useState, useEffect } from "react";
import api from "../Services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

const contact = async (datacontact) => {

  try {
    const { data } = await api.post("/contact",datacontact);
      console.log(data.message || "Login successful");
    
  } catch (error) {
   console.log(error)
  } finally {
    setLoading(false);
  }
};

 
  const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }
  try {
    const { data } = await api.get("/user");
    setUser(data)
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    logout();
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getUser();
  }, []);

 
  const login = async (formData) => {
    try {

      const { data } = await api.post("/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setSuccessMessage(data.message || "Login successful");
getUser()
      return { success: true };
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: "Login failed" });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };


  const register = async (formData) => {
    try {
  
      const { data } = await api.post("/register", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setSuccessMessage(data.message || "Registration successful");

      return { success: true };
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: "Registration failed" });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

 
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (_) {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  
  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      setErrors(null);

      const { data } = await api.put("/profile", formData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccessMessage("Profile updated successfully");
      return { success: true };
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: "Update failed" });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

 
  const changePassword = async (formData) => {
    try {
     
      const { data } = await api.post("/change-password", formData);
      setSuccessMessage(data.message || "Password changed");

      return { success: true };
    } catch (error) {
      setErrors(error.response?.data?.errors || { message: "Password change failed" });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        errors,
        successMessage,
        login,
        contact,
        register,
        logout,
        updateProfile,
        changePassword,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
