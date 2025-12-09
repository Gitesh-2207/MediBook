import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Initialize token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);

  // Fetch all doctors
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load user profile
  const loadUserProfileData = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile. Please login again.");
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Load doctors on mount
  useEffect(() => {
    getDoctorsData();
  }, []);

  // Load profile whenever token changes
  useEffect(() => {
    if (token) loadUserProfileData();
    else setUserData(null);
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
