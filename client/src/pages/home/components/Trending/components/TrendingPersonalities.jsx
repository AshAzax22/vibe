import React from "react";
import styles from "../css/trendingPersonalities.module.css";
import SuggestedUser from "./SuggestedUser";

const TrendingPersonalities = () => {
  const userlist = [
    { name: "John Doe", followCount: 1200 },
    { name: "Jane Smith", followCount: 1500 },
    { name: "Alice Johnson", followCount: 900 },
    { name: "Bob Brown", followCount: 1100 },
    { name: "Charlie Davis", followCount: 1300 },
    { name: "Diana Evans", followCount: 1400 },
  ];

  return (
    <>
      <div className={styles.trendingPersonalitiesContainer}>
        <div className={styles.overlayBlur}></div>
        <h2 className={styles.title}>Most Vibed Personalities</h2>
        <div className={styles.subContainer}>
          <div className={styles.suggestedUsersContainer}>
            {userlist.map((user, index) => (
              <SuggestedUser
                key={index}
                name={user.name}
                followCount={user.followCount}
              />
            ))}
          </div>
          <p className={styles.viewMore}>View More</p>
        </div>
      </div>
    </>
  );
};

export default TrendingPersonalities;
