import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // If either Admin or Doctor is logged in
  if (aToken || dToken) {
    return (
      <div className="bg-[#F8F9FD] min-h-screen">
        <ToastContainer />
        <NavBar />
        <div className="flex items-start">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              {/*admin route */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              {/*doc route */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
