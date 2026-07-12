import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user-register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      await checkAuth();
      navigate("/");
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    

    <div className="bg-neutral-950 min-h-screen w-full flex flex-col text-white antialiased">
      <Layout>
        
        <div className="w-full max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to from-blue-400 to-blue-600 mb-6">
            Create Account
          </h1>

          <form
            className="w-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col gap-5"
            onSubmit={handleFormSubmit}
            action=""
          >
            <div className="text-center mb-1">
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                Sign Up
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Join SneakerHead today to start your collection
              </p>
            </div>

           
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
                Username
              </label>
              <input
                required
                name="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
                Email Address
              </label>
              <input
                required
                name="email"
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
            </div>

            
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-150"
            >
              Sign Up
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default SignupPage;
