import { useState, useEffect } from "react";
import styles from "./css/profile.module.css";
import { useParams } from "react-router-dom";
import avatars from "../../../../assets/avatars.js";
import Stats from "./components/Stats.jsx";
import PollActivity from "./components/PollActivity.jsx";
import { getUserData, follow, unfollow } from "../../api.js";
import { useSocket } from "../../../../components/SocketProvider.jsx";
import Loader from "../Loader.jsx";
import FollowData from "./components/FollowData.jsx";
const Profile = () => {
  const { username } = useParams();
  const socket = useSocket();

  const [activeUser, setActiveUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [follows, setFollows] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [found, setFound] = useState(true);

  const [activeTab, setActiveTab] = useState("pollActivity");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setActiveUser(username);
  }, []);

  useEffect(() => {
    if (!activeUser) return;
    setActiveTab("pollActivity");

    const getData = async () => {
      setLoading(true);
      const response = await getUserData(username);
      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setUserData(data);
      } else {
        console.log("error");
        setFound(false);
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

      socket.on("following", (data) => {
        console.log(`you followed ${data.username}`);
        setUserData((prevUserData) => ({
          ...prevUserData,
          followers: [...prevUserData.followers, activeUser],
        }));
      });

      socket.on("unfollowing", (data) => {
        console.log(`you unfollowed ${data.username}`);
        setUserData((prevUserData) => ({
          ...prevUserData,
          followers: prevUserData.followers.filter(
            (user) => user !== activeUser
          ),
        }));
      });

      socket.on("followed", (data) => {
        console.log(`${data.username} followed you`);
        console.log("socket event followed");
        setUserData((prevUserData) => ({
          ...prevUserData,
          following: [...prevUserData.following, username],
        }));
      });

      socket.on("unfollowed", (data) => {
        console.log(`${data.username} unfollowed you`);
        setUserData((prevUserData) => ({
          ...prevUserData,
          following: prevUserData.following.filter((user) => user !== username),
        }));
      });

      return () => {
        socket.off("pollDelete");
        socket.off("following");
        socket.off("followed");
      };
    }
  }, [socket, username, activeUser]);

  useEffect(() => {
    if (userData.followers && userData.followers.includes(activeUser)) {
      setFollows(true);
    }
  }, [userData]);

  const handleFollow = async () => {
    setButtonLoading(true);
    const response = await follow(activeUser, userData.username);
    if (response.ok) {
      setFollows(true);
      setButtonLoading(false);
    } else {
      const data = await response.json();
      console.log(data.message);
      setButtonLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setButtonLoading(true);
    const response = await unfollow(activeUser, userData.username);
    if (response.ok) {
      setFollows(false);
      setButtonLoading(false);
    } else {
      const data = await response.json();
      console.log(data.message);
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.title}>Profile</div>
        {!found ? (
          <p className={styles.emptyMessage}>User not found</p>
        ) : loading ? (
          <div className={styles.loadingContainer}>
            <Loader />
            <p className={styles.emptyMessage}>Loading Profile</p>
          </div>
        ) : (
          <>
            <img
              src={avatars[userData.avatar]}
              alt="pfp"
              className={styles.avatar}
            />
            <div className={styles.username}>@{userData.username}</div>
            <Stats
              polls={userData.pollsCreated.length}
              followers={userData.followers.length}
              following={userData.following.length}
              setActiveTab={setActiveTab}
            />
            {activeUser !== userData.username &&
              (follows ? (
                <button
                  className={styles.unfollow}
                  onClick={handleUnfollow}
                  disabled={buttonLoading}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={styles.follow}
                  onClick={handleFollow}
                  disabled={buttonLoading}
                >
                  Follow
                </button>
              ))}
            {activeTab === "pollActivity" ? (
              <PollActivity
                pollsCreated={userData.pollsCreated}
                pollsVoted={userData.pollsVoted}
                activeUser={activeUser}
              />
            ) : activeTab === "followers" ? (
              <FollowData usernames={userData.followers} title={"Followers"} />
            ) : activeTab === "following" ? (
              <FollowData usernames={userData.following} title={"Following"} />
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
