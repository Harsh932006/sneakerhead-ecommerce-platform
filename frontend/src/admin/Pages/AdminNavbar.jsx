import React from 'react'
import axios from "axios"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {toast} from "react-toastify";

const AdminNavbar = () => {

    const {admin, setAdmin} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            const response = await axios.get(
                "http://localhost:3000/api/auth/admin-logout",
                {
                    withCredentials: true
                }
            )
            setAdmin(null);
            navigate("/");
            toast.success(response.data.message);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='flex items-center justify-between px-40 py-5'>
        <h1 className='font-bold text-2xl'>Dashboard</h1>

        <button className='bg-blue-600 px-4 py-2 rounded-xl font-medium' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminNavbar