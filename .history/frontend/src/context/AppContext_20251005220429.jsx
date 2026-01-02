import { createContext } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios"
import { useState } from "react";
export const AppContext = createContext()


const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const value = {
        doctors, currencySymbol
    }

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendurl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
        } catch (error) {

        }
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider