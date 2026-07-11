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
    

    <header className="w-full pt-4">
            
            <nav className="max-w-[92%] mx-auto flex items-center justify-between px-8 py-4 rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-neutral-800/50 shadow-lg">
                
                
                <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <h1 className="font-black text-xl tracking-tight text-neutral-100">
                        Merchant Dashboard
                    </h1>
                </div>

               
                <div className="flex items-center gap-6">
                    {admin && (
                        <span className="text-xs font-semibold text-neutral-400 tracking-wide hidden sm:inline">
                            Session Status: <span className="text-blue-400 font-bold">Active</span>
                        </span>
                    )}
                    
                    <button 
                        onClick={handleLogout}
                        className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-red-950/40 hover:text-red-400 border border-neutral-700/50 hover:border-red-900/50 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-[0.98]"
                    >
                        Logout
                    </button>
                </div>
                
            </nav>
        </header>
  )
}

export default AdminNavbar