import React, { useState } from "react";
import styles from "../css/poll.module.css";
import avatar from "../../../assets/avatars/Preview.png";
import comment from "../images/comment.svg";
import save from "../images/save.svg";
import more from "../images/moreVertical.svg";

const Poll = ({ data }) => {
  const { creator, question, options } = data;
  const [selectedOption, setSelectedOption] = useState(null);

  // Calculate the total number of votes
  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  // Handle option click
  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <>
      <div className={styles.pollContainer}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <img src={avatar} alt="profile" className={styles.profile} />
            <p className={styles.creator}>{creator}</p>
          </div>
          <p className={styles.voteCount}>{totalVotes} votes</p>
        </div>
        <div className={styles.question}>{question}</div>
        <ul className={styles.options}>
          {options.map((option, index) => {
            // Calculate the percentage of votes for each option
            const percentage = Math.round((option.votes / totalVotes) * 100);
            return (
              <li
                key={index}
                className={`${styles.option} ${
                  selectedOption === index ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(index)}
              >
                <div className={styles.optionText}>{option.option}</div>
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
