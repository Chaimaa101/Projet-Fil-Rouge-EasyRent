import { createContext, useState, useEffect } from "react";
import api from "../Services/api";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/user");
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
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
      setLoading(true);
      setErrors(null);

      const { data } = await api.post("/login", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toast.success(data.message || "Connexion réussie");
      return { result: true };
    } catch (error) {
       if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Veuillez corriger les erreurs");
      } else {
        toast.error("Erreur serveur");
      }
    } finally {
      setLoading(false);
    }
  };

 
  const register = async (formData) => {
    try {
      setLoading(true);
      setErrors(null);

      const { data } = await api.post("/register", formData);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

       toast.success(
        "Consultez votre email pour le lien d'accès à votre espace",
        { duration: 5000 }
      );
      
      return { success: true };
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Veuillez corriger les erreurs");
      } else {
        toast.error("Erreur serveur");
      }
   console.log(error)
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await api.post("/logout");
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    toast.success("Déconnexion réussie");
    } catch(error) {
      toast.error(error?.response?.data?.errors)
    }

  };


  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      setErrors(null);
      
      formData.append("_method", "PUT");
      const { data } = await api.post("/profile", formData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Profil mis à jour");
      return { success: true };
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Veuillez corriger les erreurs");
      } else {
        toast.error("Erreur serveur");
      }
      console.log(error)
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  
  const changePassword = async (formData) => {
    try {
      setLoading(true);

      const { data } = await api.post("/change-password", formData);
      toast.success(data.message || "Mot de passe modifié");

      return { success: true };
    } catch (error) {
      const message =
        Object.values(error.response?.data?.errors || {})[0]?.[0] ||
        "Échec du changement";

      toast.error(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };


  const contact = async (dataContact) => {
    try {
      setLoading(true);
      await api.post("/contact", dataContact);
      toast.success("Message envoyé avec succès");
    } catch {
      toast.error("Erreur lors de l'envoi");
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
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        contact,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
