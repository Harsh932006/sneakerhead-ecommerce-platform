import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Loading from '../../landing_page/components/Loading';
import axios from "axios"
import { toast } from 'react-toastify';


const ProtectedAdminRoute = ({children}) => {
    const [loader, setloader] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAuth = async () => {

        try{

            const response = await axios.get(
                "https://sneakerhead-ecommerce-platform.onrender.com/api/auth/curr-admin",
                {
                    withCredentials: true
                }
            )

            console.log(response.data);
            setloader(false);
            setIsAuthenticated(true);

        }catch(err){
            console.log(err);
            setloader(false);
            setIsAuthenticated(false);
        }

    }

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if(!loader && !isAuthenticated){
          toast.error("Please login first to access dashboard.")
        }
      }, [loader, isAuthenticated])

    if(loader){
        return <Loading />
    }

    if(!isAuthenticated){
        return <Navigate to="/admin-login" />
    }

  return (
    <>
    {children}
    </>
  )
}

export default ProtectedAdminRoute