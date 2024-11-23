import styles from "./css/home.module.css";
import Navbar from "./components/Navbar/Navbar";
import Trending from "./components/Trending/Trending";
import { useSocket } from "../../components/SocketProvider";
import { useState, useEffect } from "react";
import { getUserData, getUser } from "./api";
import Loading from "../../components/Loading";

const Home = ({ children }) => {
  const socket = useSocket();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsername = async () => {
      const response = await getUser();
      if (response.ok) {
        const data = await response.json();
        return data.username;
      } else {
        console.log("error");
      }
    };

    const getData = async (username) => {
      const response = await getUserData(username);
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setUserData(data);

        if (socket) {
          socket.emit("join", data._id);
        } else {
          console.log("error in socket connection");
        }
      } else {
        console.log("error");
      }
    };

    const getAllData = async () => {
      const username = await getUsername();
      getData(username);
    };

    getAllData();

    return () => {
      if (socket && userData._id) {
        socket.emit("leave", userData._id);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("username", userData.username);
  }, [userData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.homeContainer}>
      <Navbar username={userData.username} avatar={userData.avatar} />
      {children}
      <Trending />
    </div>
  );
};

export default Home;
