import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";

const AdminSignup = () => {
  const [username, setUsername] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const {checkAdminAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin-register",
        {
          username,
          orgName,
          email,
          password,
          address,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);

      await checkAdminAuth();
      navigate("/admin-login");
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
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter organization name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
