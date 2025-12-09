import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext"; // ✅ Added for doctor support
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext); // ✅ for doctor login
  const navigate = useNavigate();

  const logout = () => {
    // ✅ Clear both tokens (in case NavBar is shared)
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
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs"> {/* ✅ fixed 'item-center' */}
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin Logo"
          onClick={() => navigate("/")} // Optional: makes logo clickable
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : dToken ? "Doctor" : "User"}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full hover:bg-[#4E5AE8] transition"
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
