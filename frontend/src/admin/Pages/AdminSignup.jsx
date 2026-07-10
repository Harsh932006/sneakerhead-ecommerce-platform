import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";

const AdminSignup = () => {
  // const [username, setUsername] = useState("");
  // const [orgName, setOrgName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [address, setAddress] = useState("");


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
    <div className="admin-login bg-black">
      {/* <AdminNavbar /> */}
      <h1 className="text-center text-4xl pt-5">Signup As Admin</h1>
      <form
        className="login-form flex flex-col items-center justify-start pt-20 gap-10"
        onSubmit={handleFormSubmit}
        action=""
      >
        <input
        required
        name="username"
          type="text"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
        required
        name="orgName"
          type="text"
          placeholder="Enter organization name"
          value={formData.orgName}
          onChange={handleChange}
        />
        <input
        required
        name="email"
          type="text"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
        required
        name="password"
          type="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
        required
        name="address"
          type="text"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
