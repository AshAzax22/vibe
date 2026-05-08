import React, { useState, useEffect } from "react";
import styles from "../css/trendingPolls.module.css";
import TrendingPoll from "../../PollMini";
import { getTrendingPolls } from "../../../../../api";

const TrendingPolls = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTrendingPolls().then((res) => {
      if (res && res.ok) {
        res.json().then((data) => {
          setData(data);
        });
      }
    });
  }, []);
  return (
    <>
      <div className={styles.trendingPollsContainer}>
        <div className={styles.title}>Trending Polls</div>
        <div className={styles.subContainer}>
          {data.map((poll, index) => (
            <TrendingPoll key={index} data={poll} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingPolls;
