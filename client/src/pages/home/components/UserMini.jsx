import React from "react";
import styles from "../css/suggestedUser.module.css";
import avatars from "../../../assets/avatars.js";
import more from "../images/moreVertical.svg";
import { useNavigate } from "react-router-dom";

const formatFollowCount = (count) => {
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
        <button className={styles.progressiveButton}>Vibe</button>
        <img src={more} alt="more" className={styles.icon} />
      </div>
    </>
  );
};

export default UserMini;
