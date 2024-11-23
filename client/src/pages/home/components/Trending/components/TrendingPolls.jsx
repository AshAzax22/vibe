import React from "react";
import styles from "../css/trendingPolls.module.css";
import TrendingPoll from "./TrendingPoll";

const data = [
  {
    question: "What is the best cartoon from the last decade?",
    uploaded: "2023-10-01T10:30:00Z",
    votes: 7842,
  },
  {
    question: "Which is the most influential tech company?",
    uploaded: "2023-09-25T14:45:00Z",
    votes: 9845,
  },
  {
    question: "What is your favorite programming language?",
    uploaded: "2023-09-20T09:15:00Z",
    votes: 14568,
  },
  {
    question: "What is the best movie of 2023?",
    uploaded: "2023-09-15T18:00:00Z",
    votes: 7469,
  },
  {
    question: "Which social media platform do you use the most?",
    uploaded: "2023-09-10T12:00:00Z",
    votes: 4578,
  },
  {
    question: "Which social media platform do you use the most?",
    uploaded: "2023-09-10T12:00:00Z",
    votes: 4578,
  },
  {
    question: "Which social media platform do you use the most?",
    uploaded: "2023-09-10T12:00:00Z",
    votes: 4578,
  },
  {
    question: "Which social media platform do you use the most?",
    uploaded: "2023-09-10T12:00:00Z",
    votes: 4578,
  },
];

const TrendingPolls = () => {
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
