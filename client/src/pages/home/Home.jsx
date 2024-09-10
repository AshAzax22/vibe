import React from "react";
import styles from "./css/home.module.css";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Trending from "./components/Trending";
const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <Navbar />
        <Feed />
        <Trending />
      </div>
    </>
  );
};

export default Home;
