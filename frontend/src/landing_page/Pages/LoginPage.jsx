import React, {useState, useContext} from 'react'
import axios from "axios"
import Layout from '../components/Layout'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {checkAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(
        "http://localhost:3000/api/auth/user-login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )

      await checkAuth();
      navigate("/");
      toast.success("Logged in successfully");
    }catch(err){
      toast.error("Invalid credentials");
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className='bg-black'>
      <Layout>
        <h1>LoginPage</h1>

        <form className='login-form flex flex-col items-center justify-start pt-40 gap-10' onSubmit={handleFormSubmit} action="">
          <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
        </form>
      </Layout>
    </div>
  )
}

export default LoginPage