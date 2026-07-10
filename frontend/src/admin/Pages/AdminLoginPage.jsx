import React from 'react'
import { useState,  useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin-login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      )

      await checkAdminAuth();
      navigate("/admin-dashboard");
      toast.success(response.data.message);
    }catch(err){
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className='admin-login bg-black'>
        {/* <AdminNavbar /> */} 

        <h1 className="text-center text-4xl pt-5">Login As Admin</h1>

        <form className='login-form flex flex-col items-center justify-start pt-20 gap-10' onSubmit={handleFormSubmit} action="">
          <input required name="email" type="text" placeholder='Enter your email' value={formData.email} onChange={handleChange} />
          <input required name="password" type="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} />
          <button type="submit">Log In</button>
        </form>
    </div>
  )
}

export default AdminLoginPage