import React, { useState, useEffect } from "react";
import styles from "./Feed/css/feed.module.css";
import Loader from "../../../components/ui/Loader";
import Poll from "./Poll";
import { getSavedPolls } from "../../../api";

const Saved = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedPolls().then((res) => {
      if (res && res.ok) {
        res.json().then((data) => {
          setPolls(data);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>Saved Polls</h1>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      ) : polls.length === 0 ? (
        <p className={styles.emptyMessage}>You haven't saved any polls yet.</p>
      ) :(
        <div className={styles.pollListContainer}>
          {polls.map((poll, index) => (
          <Poll
            key={index}
            pollId={poll.pollId}
            creator={poll.creator.username}
            avatar={poll.creator.avatar}
            question={poll.question}
            options={poll.options}
            selected={poll.selectedIndex !== undefined ? poll.selectedIndex : null}
            uploadDate={poll.date}
            saved={true}
          />
        ))}
        </div>
      ) 
      }
    </div>
  );
};

export default Saved;
