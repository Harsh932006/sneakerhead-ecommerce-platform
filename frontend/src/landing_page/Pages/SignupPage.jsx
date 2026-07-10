import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const SignupPage = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const {checkAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
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
    )
    console.log(response.data);
    await checkAuth();
    navigate("/");
    toast.success(response.data.message);
    }catch(err){
      console.log(err);
    }
    
  }

  
  return (
    <div className='bg-black'>
      <Layout>
        <h1>SignUp Page</h1>

        <form className='login-form flex flex-col items-center justify-start pt-40 gap-10' onSubmit={handleFormSubmit} action="">
          <input required name="username" type="text" placeholder='Enter username' value={formData.username} onChange={handleChange}/>
          <input required name="email" type="text" placeholder='Enter your email' value={formData.email} onChange={handleChange} />
          <input required name="password" type="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
      </Layout>
    </div>
  )
}

export default SignupPage