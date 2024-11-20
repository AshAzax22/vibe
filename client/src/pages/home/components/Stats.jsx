import React from "react";
import styles from "../css/stats.module.css";

const Stats = ({ polls }) => {
  return (
    <>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{polls}</div>
          <div className={styles.statTitle}>Polls</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statTitle}>Followers</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statTitle}>Following</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>0</div>
          <div className={styles.statTitle}>Vibe</div>
        </div>
      </div>
    </>
  );
};

export default Stats;
