import { useState } from "react";
import styles from "../css/switchNav.module.css";
const SwitchNav = ({ selectedTab, setSelectedTab }) => {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={styles.switchNavContainer}>
        <p
          className={`${styles.tab} ${
            selectedTab === "pollsCreated" ? styles.selected : ""
          }`}
          onClick={() => handleTabClick("pollsCreated")}
        >
          Polls Created
        </p>
        <p
          className={`${styles.tab} ${
            selectedTab === "pollsVoted" ? styles.selected : ""
          }`}
          onClick={() => handleTabClick("pollsVoted")}
        >
          Polls Voted
        </p>
      </div>
    </>
  );
};

export default SwitchNav;
