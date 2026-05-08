import React, { useState } from "react";
import styles from "../css/suggestedUser.module.css";
import avatars from "../../../assets/avatars.js";
import more from "../../../assets/images/moreVertical.svg";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./UserDataProvider";
import { follow, unfollow } from "../../../api";

const formatFollowCount = (count) => {
  if (count === undefined) return "0";
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  } else {
    return count.toString();
  }
};

const UserMini = ({ username, followCount, avatar = 0 }) => {
  const navigate = useNavigate();
  const currentUser = useUserData();
  const [isFollowing, setIsFollowing] = useState(
    currentUser.following ? currentUser.following.includes(username) : false
  );

  const handleFollow = async (e) => {
    e.stopPropagation();
    if (isFollowing) {
      await unfollow(currentUser.username, username);
      setIsFollowing(false);
    } else {
      await follow(currentUser.username, username);
      setIsFollowing(true);
    }
  };

  const handleNavigate = () => {
    navigate(`/profile/${username}`);
  };
  return (
    <>
      <div
        className={styles.suggestedUserContainer}
        onClick={() => handleNavigate()}
      >
        <img src={avatars[avatar]} alt="profile" className={styles.avatar} />
        <div className={styles.userInfo}>
          <p className={styles.userName}>{username}</p>
          <p className={styles.followCount}>
            {formatFollowCount(followCount)} followers
          </p>
        </div>
        <button className={styles.progressiveButton} onClick={handleFollow}>
          {isFollowing ? "Vibing" : "Vibe"}
        </button>
        <img src={more} alt="more" className={styles.icon} />
      </div>
    </>
  );
};

export default UserMini;
