import { useCallback, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";

export default function ToastMessage() {
  const {errors, successMessage} = useContext(AuthContext)
  useEffect(() => {
    if (errors?.message) toast.error(errors.message);
    if (successMessage) toast.success(successMessage);
  }, [errors, successMessage]);
}
