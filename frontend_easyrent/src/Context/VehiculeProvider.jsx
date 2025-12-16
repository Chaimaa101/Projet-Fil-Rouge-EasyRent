import { createContext, useState } from "react";
import api from "../Services/api";

export const VehiculeContext = createContext()
export default VehiculeProvider = ({children}) =>{

    const [vehicules,setVehicules] = useState([])
    const [loading,setLoading] = useState(false)
    const [errors,setErrors] = useState(null)
    const [successMessage,setSuccessMessage] = useState('')

    const getVehicules = async () =>{
        try {
            
            const res = await api.get("/vehicules")
            console.log(res.data)


        } catch (error) {
            
        }
    }

const values = {}
    return(
        <VehiculeContext.Provider value={values}>
            {children}
        </VehiculeContext.Provider>
    )

}