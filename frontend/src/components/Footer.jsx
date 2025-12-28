import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img className="mb-5 w-40" src={assets.logo1} alt="MediBook Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            MediBook simplifies healthcare by allowing patients to book doctor appointments online with ease. Find the right doctor, choose a convenient time, and manage your appointments effortlessly through a secure and reliable platform.
          </p>
        </div>

        {/* center */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : ""
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* right */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-987654321</li>
            <li>helpline@medibook.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright @ Medibook 2025. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
