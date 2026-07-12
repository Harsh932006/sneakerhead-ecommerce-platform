import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";

const AdminSignup = () => {

  const [formData, setFormData] = useState({
    username: "",
    orgName: "",
    email: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }


  const {checkAdminAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin-register",
        {
          username: formData.username,
          orgName: formData.orgName,
          email: formData.email,
          password: formData.password,
          address: formData.address,
        },
        {
          withCredentials: true,
        },
      );

      await checkAdminAuth();
      navigate("/admin-dashboard");
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="bg-neutral-950 min-h-screen w-full flex flex-col items-center justify-center text-white antialiased px-4 py-12">
      
      
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to from-blue-400 to-blue-600 mb-6">
          Merchant Portal
        </h1>

        <form
          className="w-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col gap-5"
          onSubmit={handleFormSubmit}
          action=""
        >
          <div className="text-center mb-1">
            <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">Signup As Admin</h2>
            <p className="text-sm text-neutral-400 mt-1">Register your store to start listing sneakers</p>
          </div>

          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Username</label>
            <input
              required
              name="username"
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Organization Name</label>
            <input
              required
              name="orgName"
              type="text"
              placeholder="Enter organization name"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Email Address</label>
            <input
              required
              name="email"
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Password</label>
            <input
              required
              name="password"
              type="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>

          
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-blue-400 tracking-wider uppercase px-1">Business Address</label>
            <input
              required
              name="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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
    </div>
  );
};

export default AdminSignup;
