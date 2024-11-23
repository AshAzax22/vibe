import { useState } from "react";
import styles from "../css/trendingPoll.module.css";
import trash from "../../../images/trash.svg";
import { deletePoll } from "../../../api";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal";

const formatTimeDifference = (uploaded) => {
  const now = new Date();
  const uploadDate = new Date(uploaded);
  let diffInSeconds = Math.floor((now - uploadDate) / 1000);

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

const formatVoteCount = (votes) => {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1) + "M";
  } else if (votes >= 1000) {
    return (votes / 1000).toFixed(1) + "k";
  } else {
    return votes.toString();
  }
};

const TrendingPoll = ({ data, remove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeModal();
  };
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/poll/${data.pollId}`);
  };

  const handleDelete = async () => {
    const response = await deletePoll(data.pollId);
    if (response.ok) {
      console.log("deleted");
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <div className={styles.trendingPollContainer} onClick={handleNavigate}>
        <div className={styles.subContainer}>
          <div className={styles.pollData}>
            <div className={styles.question}>{data.question}</div>
            <div className={styles.questionDetails}>
              <div className={styles.uploaded}>
                {formatTimeDifference(data.date)}
              </div>
              <div className={styles.votes}>
                {formatVoteCount(data.votes)} votes
              </div>
            </div>
          </div>
          {remove && (
            <img
              src={trash}
              alt="delete"
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className={styles.delete}
            />
          )}
        </div>

        <hr />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default TrendingPoll;
