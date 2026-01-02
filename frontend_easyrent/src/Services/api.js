import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const message = error.response?.data?.error || "";

    if (message) {
      toast.error(message);
    } else {
      switch (status) {
        case 401:
          toast.error("Veuillez vous connecter");
          break;
        case 403:
          toast.error("Action non autorisée");
          break;
        case 405:
          toast.error("Action non autorisé");
          break;
        case 404:
          toast.error("Ressource introuvable");
          break;
        case 500:
          toast.error("Erreur serveur");
          break;
      }
    }

    return Promise.reject(error);
  }
);


export default api;
