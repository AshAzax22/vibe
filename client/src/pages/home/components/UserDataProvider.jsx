import { useContext, createContext } from "react";

const userDataContext = createContext(null);

const useUserData = () => {
  return useContext(userDataContext);
};

const UserDataProvider = ({ userData, children }) => {
  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};

export { useUserData, UserDataProvider };
