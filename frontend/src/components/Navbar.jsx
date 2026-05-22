import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData, backendUrl } = useContext(AppContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Profile Image
  const getProfileImage = () => {
    if (!userData?.image) return assets.profile_pic;

    if (userData.image.startsWith("http")) {
      return userData.image;
    }

    return `${backendUrl.replace(/\/$/, "")}/${userData.image.replace(
      /^\//,
      ""
    )}`;
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm border-b border-gray-200">

        <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-4">

          {/* Logo */}
          <img
            onClick={() => navigate("/")}
            className="w-36 sm:w-40 md:w-44 cursor-pointer"
            src={assets.logo1}
            alt="Logo"
          />

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-[15px]">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5f6FFF] font-semibold"
                  : "text-gray-700 hover:text-[#5f6FFF] transition-all"
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5f6FFF] font-semibold"
                  : "text-gray-700 hover:text-[#5f6FFF] transition-all"
              }
            >
              ALL DOCTORS
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5f6FFF] font-semibold"
                  : "text-gray-700 hover:text-[#5f6FFF] transition-all"
              }
            >
              ABOUT
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#5f6FFF] font-semibold"
                  : "text-gray-700 hover:text-[#5f6FFF] transition-all"
              }
            >
              CONTACT
            </NavLink>

          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">

            {token ? (
              <div className="flex items-center gap-2 cursor-pointer relative">

                {/* Profile */}
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border object-cover"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onError={(e) => (e.target.src = assets.profile_pic)}
                />

                <img
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                  className="w-3"
                  onClick={() => setShowDropdown(!showDropdown)}
                />

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50">

                    <ul className="flex flex-col text-sm">

                      <li
                        onClick={() => {
                          navigate("/my-profile");
                          setShowDropdown(false);
                        }}
                        className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-[#5f6FFF] cursor-pointer transition-all"
                      >
                        My Profile
                      </li>

                      <li
                        onClick={() => {
                          navigate("/my-appointments");
                          setShowDropdown(false);
                        }}
                        className="px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-[#5f6FFF] cursor-pointer transition-all"
                      >
                        My Appointments
                      </li>

                      <li
                        onClick={logout}
                        className="px-4 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 cursor-pointer transition-all"
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
                className="bg-[#5f6FFF] text-white px-6 py-3 rounded-full text-sm font-medium hidden md:block hover:opacity-90 transition-all"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Icon */}
            <img
              onClick={() => setShowMenu(true)}
              className="w-6 md:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="menu"
            />

            {/* Mobile Menu */}
            <div
              className={`${showMenu ? "fixed w-full h-full" : "w-0 h-0"
                } md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}
            >

              <div className="flex items-center justify-between p-5 border-b">

                <img
                  className="w-36"
                  src={assets.logo1}
                  alt="Logo"
                />

                <img
                  className="w-7 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  alt="Close"
                />

              </div>

              <ul className="flex flex-col items-center gap-8 mt-14 font-medium text-gray-700">

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

                {!token ? (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/login");
                    }}
                    className="w-full text-center bg-[#5f6FFF] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                  >
                    Create Account
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/my-profile");
                    }}
                    className="w-full text-center bg-[#5f6FFF] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                  >
                    My Profile
                  </button>
                )}

              </ul>

            </div>

          </div>

        </div>

      </div>

      {/* Space Below Fixed Navbar */}
      <div className="h-[90px]"></div>
    </>
  );
};

export default Navbar;