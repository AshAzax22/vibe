import React, { useState, useEffect } from "react";
import styles from "../css/poll.module.css";
import { poll } from "../api";
import comment from "../images/comment.svg";
import save from "../images/save.svg";
import more from "../images/moreVertical.svg";
import avatars from "../../../assets/avatars";

const Poll = ({
  pollId,
  creator,
  question,
  options,
  avatar,
  selected,
  uploadDate,
}) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [initialSelectionSet, setInitialSelectionSet] = useState(false);

  useEffect(() => {
    if (!initialSelectionSet) {
      setSelectedOption(selected);
      setInitialSelectionSet(true);
    }
  }, [selected, initialSelectionSet]);

  useEffect(() => {
    const vote = async () => {
      if (selectedOption !== null && initialSelectionSet) {
        let email = localStorage.getItem("email");
        let response = await poll(pollId, selectedOption, email);
        // Handle the response if needed
      }
    };

    vote();
  }, [selectedOption, initialSelectionSet]);

  // Calculate the total number of votes
  const totalVotes = options.reduce(
    (total, option) => total + option.voteCount,
    0
  );

  // Handle option click
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const formatTimeDifference = (uploadDate) => {
    const now = new Date();
    const upload = new Date(uploadDate);
    let diffInSeconds = Math.floor((now - upload) / 1000);

    if (diffInSeconds < 0) {
      diffInSeconds = 0;
    }

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} s ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      <div className={styles.pollContainer}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img
              src={avatars[avatar]}
              alt="profile"
              className={styles.profile}
            />
            <div className={styles.subContainer}>
              <p className={styles.creator}>{creator}</p>
              <p className={styles.uploadDate}>
                {formatTimeDifference(uploadDate)}
              </p>
            </div>
          </div>
          <p className={styles.voteCount}>{totalVotes} votes</p>
        </div>
        <div className={styles.question}>{question}</div>
        <ul className={styles.options}>
          {options.map((option, index) => {
            // Calculate the percentage of votes for each option
            const percentage =
              totalVotes === 0
                ? 0
                : Math.round((option.voteCount / totalVotes) * 100);
            return (
              <li
                key={index}
                className={`${styles.option} ${
                  selectedOption === index ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(index)}
              >
                <div className={styles.optionText}>{option.text}</div>
                <div className={styles.optionVotes}>{percentage}%</div>
              </li>
            );
          })}
        </ul>
        <section className={styles.pollUserFunctions}>
          <div>
            <img src={comment} alt="comment" className={styles.icon} />
            <img src={save} alt="save" className={styles.icon} />
          </div>
          <img src={more} alt="more" className={styles.icon} />
        </section>
      </div>
    </>
  );
};

export default Poll;
