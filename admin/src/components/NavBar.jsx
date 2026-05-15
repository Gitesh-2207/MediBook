import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const { aToken, setAToken } = useContext(AdminContext);

  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // Logout
  const logout = () => {

    if (aToken) {

      setAToken("");
      localStorage.removeItem("aToken");

    }

    if (dToken) {

      setDToken("");
      localStorage.removeItem("dToken");

    }

    navigate("/");

  };

  return (
    <>

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-10 py-4 bg-white shadow-sm">

        {/* Left Side */}
        <div className="flex items-center gap-3 text-xs">

          <img
            className="w-36 sm:w-40 cursor-pointer"
            src={assets.admin_logo}
            alt="Admin Logo"
            onClick={() => navigate("/")}
          />

          <p className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">

            {aToken
              ? "Admin"
              : dToken
                ? "Doctor"
                : "User"}

          </p>

        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-[#5F6FFF] hover:bg-[#4E5AE8] transition-all duration-200 text-white text-sm px-6 sm:px-10 py-2 rounded-full"
        >
          Logout
        </button>

      </div>

      {/* Space Below Navbar */}
      <div className="h-[80px]"></div>

    </>
  );
};

export default NavBar;