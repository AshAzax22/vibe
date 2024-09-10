import React, { createContext, useContext } from "react";

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
      const response = await fetch("http://localhost:3000/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log("backend verification failed");
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
