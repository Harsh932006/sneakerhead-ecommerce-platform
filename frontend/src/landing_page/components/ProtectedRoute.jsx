import React, { useContext, useEffect } from "react";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login first to access cart.");
    }
  }, [authLoading, user]);

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;