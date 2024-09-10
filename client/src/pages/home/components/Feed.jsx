import React from "react";
import styles from "../css/feed.module.css";
import Poll from "./Poll";
const Feed = () => {
  const data = {
    creator: "Ashutosh",
    question: "What should I wear to the party tonight?",
    options: [
      { option: "Casual Chic", votes: 8 },
      { option: "Bold & Bright", votes: 4 },
      { option: "Sleek Black", votes: 5 },
      { option: "Sporty Vibes", votes: 2 },
    ],
  };
  const data2 = {
    creator: "Ashutosh",
    question: "What should I wear to the party tonight?",
    options: [
      { option: "Casual Chic", votes: 8 },
      { option: "Bold & Bright", votes: 4 },
      { option: "Sleek Black", votes: 5 },
      { option: "Sporty Vibes", votes: 2 },
    ],
  };

  return (
    <>
      <div className={styles.feedContainer}>
        <div className={styles.title}>Your Feed</div>
        <Poll data={data} />
        <Poll data={data2} />
      </div>
    </>
  );
};

export default Feed;
