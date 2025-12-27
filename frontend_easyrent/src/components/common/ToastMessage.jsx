import { useCallback, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider";
import { VehiculeContext } from "../../Context/VehiculeProvider";

export default function ToastMessage() {
  const {errors, successMessage} = useContext(AuthContext || VehiculeContext)

  useEffect(() => {
    if (errors) toast.error(errors);
    if (successMessage) toast.success(successMessage);
  }, [errors, successMessage]);
}
