import React from "react";
import styles from "../css/trendingPoll.module.css";

const formatTimeDifference = (uploaded) => {
  const now = new Date();
  const uploadDate = new Date(uploaded);
  const diffInSeconds = Math.floor((now - uploadDate) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} s ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} min ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} h ago`;
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days ago`;
  }
};

const formatVoteCount = (votes) => {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1) + "M";
  } else if (votes >= 1000) {
    return (votes / 1000).toFixed(1) + "k";
  } else {
    return votes.toString();
  }
};

const TrendingPoll = ({ data }) => {
  return (
    <div className={styles.trendingPollContainer}>
      <div className={styles.question}>{data.question}</div>
      <div className={styles.questionDetails}>
        <div className={styles.uploaded}>
          {formatTimeDifference(data.uploaded)}
        </div>
        <div className={styles.votes}>{formatVoteCount(data.votes)} votes</div>
      </div>
      <hr />
    </div>
  );
};

export default TrendingPoll;
