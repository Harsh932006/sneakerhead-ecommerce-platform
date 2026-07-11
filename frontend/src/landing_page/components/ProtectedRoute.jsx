import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {Navigate} from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "https://sneakerhead-ecommerce-platform.onrender.com/api/auth/curr-user",
        {
          withCredentials: true,
        },
      );

      setIsAuthenticated(true);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if(!loading && !isAuthenticated){
      toast.error("Please login first to access cart.")
    }
  }, [loading, isAuthenticated])

  if(loading){
    return <Loading />
  }

  if(!isAuthenticated){
    return (
      <>
      <Navigate to="/login" />
      </>
    )
  }

  return (
    <>
    {children}
    </>
  );
};

export default ProtectedRoute;
