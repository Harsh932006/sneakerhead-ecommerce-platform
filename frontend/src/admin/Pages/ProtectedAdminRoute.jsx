import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Loading from '../../landing_page/components/Loading';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const ProtectedAdminRoute = ({children}) => {
    const { admin, adminAuthLoading } = useContext(AuthContext);

    useEffect(() => {
        if(!adminAuthLoading && !admin){
          toast.error("Please login first to access dashboard.")
        }
      }, [adminAuthLoading, admin])

    if(adminAuthLoading){
        return <Loading />
    }

    if(!admin){
        return <Navigate to="/" />
    }

  return (
    <>
    {children}
    </>
  )
}

export default ProtectedAdminRoute