import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [latestAppointments, setLatestAppointments] = useState([]);

  // ✅ Get all appointments
  const getAppointments = async () => {
    if (!dToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (data.success) {
        setAppointments(data.appointments);

        const sorted = data.appointments
          .sort((a, b) => new Date(b.slotDate) - new Date(a.slotDate))
          .slice(0, 5);
        setLatestAppointments(sorted);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Get dashboard data
  const getDashData = async () => {
    if (!dToken) return;

    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ Get doctor profile
  const getProfileData = async () => {
    if (!dToken) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/profile`,
        {},
        { headers: { Authorization: `Bearer ${dToken}` } }
      );

      if (data.success) {
        setProfileData(data.profileData);
        console.log("Doctor profile loaded:", data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("dToken");
        setDToken("");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        backendUrl,
        dToken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        latestAppointments,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
