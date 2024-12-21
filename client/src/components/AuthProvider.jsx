import React, { createContext, useContext } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const isAuthorized = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token not found in ls");
      return false;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/authorize`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        return false;
      }
      return true;
    } catch {
      console.log("catch error");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
