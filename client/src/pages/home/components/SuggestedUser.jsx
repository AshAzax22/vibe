import React from "react";
import styles from "../css/suggestedUser.module.css";
import avatar from "../../../assets/avatars/Preview.png";
import more from "../images/moreVertical.svg";

const formatFollowCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  } else {
    return count.toString();
  }
};

const SuggestedUser = ({ name, followCount }) => {
  return (
    <>
      <div className={styles.suggestedUserContainer}>
        <img src={avatar} alt="profile" className={styles.avatar} />
        <div className={styles.userInfo}>
          <p className={styles.userName}>{name}</p>
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

export default SuggestedUser;
