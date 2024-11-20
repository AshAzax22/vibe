import { useState, useEffect } from "react";
import styles from "../css/profile.module.css";
import avatars from "../../../assets/avatars";
import Stats from "./Stats";
import PollActivity from "./PollActivity";
import { getUserData } from "../api";
import { useSocket } from "../../../components/SocketProvider.jsx";
import Loader from "./Loader.jsx";
const Profile = () => {
  const socket = useSocket();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await getUserData();
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setUserData(data);
      } else {
        console.log("error");
      }
    };

    getData();

    if (socket) {
      socket.on("pollDelete", (pollid) => {
        setUserData((prevData) => {
          return {
            ...prevData,
            pollsCreated: prevData.pollsCreated.filter(
              (poll) => poll.pollId !== pollid
            ),
            pollsVoted: prevData.pollsVoted.filter(
              (poll) => poll.pollId !== pollid
            ),
          };
        });
      });

      // Clean up the socket event listener when the component unmounts
      return () => {
        socket.off("pollDelete");
      };
    }
  }, [socket]);

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.title}>Profile</div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loader />
            <p className={styles.emptyMessage}>Loading your polls</p>
          </div>
        ) : (
          <>
            <img
              src={avatars[userData.avatar]}
              alt="pfp"
              className={styles.avatar}
            />
            <div className={styles.username}>@{userData.username}</div>
            <Stats polls={userData.pollsCreated.length} />
            <PollActivity
              pollsCreated={userData.pollsCreated}
              pollsVoted={userData.pollsVoted}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
