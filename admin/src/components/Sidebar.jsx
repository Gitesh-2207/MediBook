import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);

  const { dToken } = useContext(DoctorContext);

  return (
    <>

      {/* Fixed Sidebar */}
      <div className="fixed top-[72px] left-0 h-[calc(100vh-72px)] w-[70px] md:w-72 bg-white border-r border-gray-200 overflow-y-auto z-40">

        {/* Admin Sidebar */}
        {aToken && (

          <ul className="text-gray-700 mt-5">

            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.home_icon} alt="" />

              <p className="hidden md:block font-medium">
                Dashboard
              </p>

            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.appointment_icon} alt="" />

              <p className="hidden md:block font-medium">
                Appointments
              </p>

            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.add_icon} alt="" />

              <p className="hidden md:block font-medium">
                Add Doctor
              </p>

            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.people_icon} alt="" />

              <p className="hidden md:block font-medium">
                Doctors List
              </p>

            </NavLink>

          </ul>

        )}

        {/* Doctor Sidebar */}
        {dToken && (

          <ul className="text-gray-700 mt-5">

            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.home_icon} alt="" />

              <p className="hidden md:block font-medium">
                Dashboard
              </p>

            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.appointment_icon} alt="" />

              <p className="hidden md:block font-medium">
                Appointments
              </p>

            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-200
                ${isActive
                  ? "bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]"
                  : "hover:bg-gray-50"
                }`
              }
            >

              <img src={assets.people_icon} alt="" />

              <p className="hidden md:block font-medium">
                Profile
              </p>

            </NavLink>

          </ul>

        )}

      </div>

      {/* Space for Main Content */}
      <div className="ml-[70px] md:ml-72"></div>

    </>
  );
};

export default Sidebar;