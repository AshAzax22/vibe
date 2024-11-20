import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthorized } = useAuth();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const res = await isAuthorized();
        setIsAuth(res);
      } catch (error) {
        console.error("Authorization check failed:", error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return isAuth ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
