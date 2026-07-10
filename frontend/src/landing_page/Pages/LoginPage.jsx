import React, {useState, useContext} from 'react'
import axios from "axios"
import Layout from '../components/Layout'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    formData: ""
  });

  const {checkAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChanges = (e) => {
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
        "http://localhost:3000/api/auth/user-login",
        {
          email: formData.email,
          password: formData.password,
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

  }

  return (
    <div className='bg-black'>
      <Layout>
        <h1>LoginPage</h1>

        <form className='login-form flex flex-col items-center justify-start pt-40 gap-10' onSubmit={handleFormSubmit} action="">
          {/* <label htmlFor="email">Enter your Email:</label> */}
          <input required name="email" type="text" placeholder='Enter your email' value={formData.email} onChange={handleChanges} />
          {/* <label htmlFor="password">Enter your Password:</label> */}
          <input required name="password" type="password" placeholder='Enter your password' value={formData.password} onChange={handleChanges} />
          <button type="submit">Log In</button>
        </form>
      </Layout>
    </div>
  )
}

export default LoginPage