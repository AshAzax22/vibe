import React, { useState, useEffect } from "react";
import styles from "../css/trendingPersonalities.module.css";
import UserMini from "../../UserMini";

import { getTrendingUsers } from "../../../../../api";

const TrendingPersonalities = () => {
  const [userlist, setUserlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingUsers().then((res) => {
      if (res && res.ok) {
        res.json().then((data) => {
          setUserlist(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <div className={styles.trendingPersonalitiesContainer}>
        <div className={styles.overlayBlur}></div>
        <h2 className={styles.title}>Most Vibed Personalities</h2>
        <div className={styles.subContainer}>
          <div className={styles.suggestedUsersContainer}>
            {userlist.map((user, index) => (
              <UserMini
                key={index}
                username={user.username}
                followCount={user.followCount}
                avatar={user.avatar}
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
