import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
const {backendUrl,token,setToken}=useContext(AppContext)

  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    // handle login/signup logic here
    try {
      if (state==="Sign Up") {
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
      else{
         if (state==="Sign Up") {
        const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <form 
      className="min-h-[80vh] flex items-center justify-center bg-gray-50"
      onSubmit={onSubmitHandle}
    >
      <div className="flex flex-col gap-4 mx-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-700 text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold text-gray-800">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-500">
          Please {state === "Sign up" ? "create an account" : "log in"} to book
          an appointment
        </p>

        {state === "Sign up" && (
          <div className="w-full">
            <p className="mb-1">Full Name</p>
            <input
              className="w-full border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-[#5f6FFF]"
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="w-full">
          <p className="mb-1">E-mail</p>
          <input
            className="w-full border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-[#5f6FFF]"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="w-full">
          <p className="mb-1">Password</p>
          <input
            className="w-full border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-[#5f6FFF]"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button 
          className="bg-[#5f6FFF] hover:bg-[#4c56e6] transition w-full text-white py-2 rounded-md text-base font-medium shadow-sm"
          type="submit"
        >
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span 
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span 
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => setState("Sign up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
