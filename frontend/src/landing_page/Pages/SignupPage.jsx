import React, { useState, useContext } from 'react'
import Layout from '../components/Layout'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {checkAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
      "http://localhost:3000/api/auth/user-register",
      {
        username,
        email,
        password,
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
          <input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </Layout>
    </div>
  )
}

export default SignupPage