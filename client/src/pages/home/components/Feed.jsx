import React, { useState, useEffect } from "react";
import { useSocket } from "../../../components/SocketProvider";
import styles from "../css/feed.module.css";
import Loader from "./Loader";
import Poll from "./Poll";
import { getPolls } from "../api";
const Feed = () => {
  const [polls, setPolls] = useState([]);
  const [fetchingPolls, setFetchingPolls] = useState(false);
  const socket = useSocket(); // Correctly call the useSocket hook

  useEffect(() => {
    if (socket) {
      socket.on("newPollCreated", (poll) => {
        setPolls((prevPolls) => [...prevPolls, poll]);
      });

      socket.on("pollUpdate", (poll) => {
        setPolls((prevPolls) => {
          return prevPolls.map((prevPoll) => {
            if (prevPoll.pollId === poll.pollId) {
              return poll;
            } else {
              return prevPoll;
            }
          });
        });
      });

      // Clean up the socket event listener on component unmount
      return () => {
        socket.off("newPollCreated");
        socket.off("pollUpdate");
      };
    }
  }, [socket]);

  useEffect(() => {
    setFetchingPolls(true);
    getPolls().then((polls) => {
      setFetchingPolls(false);
      setPolls(polls);
    });
  }, []);

  return (
    <>
      <div className={styles.feedContainer}>
        <h1 className={styles.title}>Your Feed</h1>
        {fetchingPolls ? (
          <div className={styles.loadingContainer}>
            <Loader />
            <p className={styles.emptyMessage}>Loading your polls</p>
          </div>
        ) : (
          <>
            {polls.map((poll, index) => {
              return (
                <Poll
                  pollId={poll.pollId}
                  creator={poll.creator.username}
                  avatar={poll.creator.avatar}
                  question={poll.question}
                  options={poll.options}
                  key={index}
                  selected={
                    poll.selectedIndex !== undefined ? poll.selectedIndex : null
                  }
                  uploadDate={poll.date}
                />
              );
            })}
            <h1 className={styles.title} style={{ margin: "200px 0px " }}>
              {polls.length == 0
                ? "No Polls to Show"
                : "Your have vibed with everything"}
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Feed;
