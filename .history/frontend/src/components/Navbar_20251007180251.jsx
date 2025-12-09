import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-start gap-6 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          ALL DOCTORS
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          CONTACT
        </NavLink>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img
              src={assets.profile_pic}
              alt="Profile"
              className="w-10 h-10 rounded-full border"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <img
              src={assets.dropdown_icon}
              alt="Dropdown"
              className="w-4 h-4"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 top-20 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-30">
                <ul className="flex flex-col">
                  <li
                    onClick={() => {
                      navigate("/my-profile");
                      setShowDropdown(false);
                    }}
                    className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    My Profile
                  </li>
                  <li
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowDropdown(false);
                    }}
                    className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                  >
                    My Appointments
                  </li>
                  <li
                    onClick={logout}
                    className="px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full h-full" : "w-0 h-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between p-4">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-6 mt-10 font-medium">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              HOME
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              ALL DOCTORS
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              ABOUT
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
