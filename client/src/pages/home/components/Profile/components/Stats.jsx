import React from "react";
import styles from "../css/stats.module.css";

const Stats = ({ polls, followers, following, setActiveTab }) => {
  return (
    <>
      <div className={styles.stats}>
        <div
          className={styles.stat}
          onClick={() => setActiveTab("pollActivity")}
        >
          <div className={styles.statValue}>{polls}</div>
          <div className={styles.statTitle}>Polls</div>
        </div>
        <div className={styles.stat} onClick={() => setActiveTab("followers")}>
          <div className={styles.statValue}>{followers}</div>
          <div className={styles.statTitle}>Followers</div>
        </div>
        <div className={styles.stat} onClick={() => setActiveTab("following")}>
          <div className={styles.statValue}>{following}</div>
          <div className={styles.statTitle}>Following</div>
        </div>
      </div>
    </>
  );
};

export default Stats;
