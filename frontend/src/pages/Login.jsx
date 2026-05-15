import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { backendUrl, setToken, token } = useContext(AppContext);

  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Submit Form
  const onSubmitHandle = async (event) => {

    event.preventDefault();

    try {

      // Sign Up
      if (state === "Sign Up") {

        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          {
            name,
            email,
            password,
          }
        );

        if (data.success) {

          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success("Account created successfully!");
          navigate("/");

        } else {

          toast.error(data.message);

        }

      }

      // Login
      else {

        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          {
            email,
            password,
          }
        );

        if (data.success) {

          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success("Logged in successfully!");
          navigate("/");

        } else {

          toast.error(data.message);

        }

      }

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong. Please try again.");

    }

  };

  // Redirect if logged in
  useEffect(() => {

    if (token) {
      navigate("/");
    }

  }, [token, navigate]);

  return (

    <form
      className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4"
      onSubmit={onSubmitHandle}
    >

      <div className="flex flex-col gap-4 w-full max-w-md p-8 rounded-2xl bg-white shadow-md text-sm text-gray-700">

        {/* Heading */}
        <div>

          <p className="text-2xl font-semibold text-gray-800">

            {state === "Sign Up"
              ? "Create Account"
              : "Login"}

          </p>

          <p className="text-gray-500 mt-1">

            Please{" "}

            {state === "Sign Up"
              ? "create an account"
              : "log in"}{" "}

            to continue

          </p>

        </div>

        {/* Full Name */}
        {state === "Sign Up" && (

          <div className="w-full">

            <p className="mb-2 font-medium text-gray-700">
              Full Name
            </p>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#5f6FFF]"
            />

          </div>

        )}

        {/* Email */}
        <div className="w-full">

          <p className="mb-2 font-medium text-gray-700">
            E-mail
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#5f6FFF]"
          />

        </div>

        {/* Password */}
        <div className="w-full">

          <p className="mb-2 font-medium text-gray-700">
            Password
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:bg-white focus:ring-1 focus:ring-[#5f6FFF]"
          />

        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#5f6FFF] hover:bg-[#4c56e6] transition-all duration-200 text-white py-3 rounded-lg text-base font-medium"
        >

          {state === "Sign Up"
            ? "Create Account"
            : "Login"}

        </button>

        {/* Switch */}
        <p className="text-center text-gray-600">

          {state === "Sign Up" ? (

            <>
              Already have an account?{" "}

              <span
                className="text-[#5f6FFF] cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </>

          ) : (

            <>
              Create a new account?{" "}

              <span
                className="text-[#5f6FFF] cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Click here
              </span>
            </>

          )}

        </p>

      </div>

    </form>

  );
};

export default Login;