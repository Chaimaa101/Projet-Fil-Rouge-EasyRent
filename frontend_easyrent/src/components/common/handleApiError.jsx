import { toast } from "react-hot-toast";

export const handleApiError = (error, defaultMessage = "Une erreur est survenue") => {
  if (!error?.response) {
    toast.error("Erreur réseau ou serveur indisponible");
    return;
  }

  const status = error.response.status;

  switch (status) {
    case 403:
      toast.error("Action non autorisée");
      break;

    case 404:
      toast.error("Ressource introuvable");
      break;

    case 405:
      toast.error("Méthode non autorisée");
      break;

    case 422:
      // validation Laravel
      toast.error("Erreur de validation");
      break;

    case 500:
      toast.error("Erreur serveur");
      break;

    default:
      toast.error(defaultMessage);
  }
};
