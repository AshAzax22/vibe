import React from "react";
import styles from "./css/trending.module.css";
import TrendingPersonalities from "./components/TrendingPersonalities";
import TrendingPolls from "./components/TrendingPolls";
const Trending = () => {
  return (
    <>
      <div className={styles.trendingContainer}>
        <TrendingPersonalities />
        <TrendingPolls />
      </div>
    </>
  );
};

export default Trending;
