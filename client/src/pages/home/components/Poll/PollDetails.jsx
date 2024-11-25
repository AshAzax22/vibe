import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./css/pollDetails.module.css";
import { useSocket } from "../../../../components/SocketProvider";
import Loader from "../Loader";
import Poll from "../Poll";
import { getPoll } from "../../api";
const PollDetails = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    socket.on("pollUpdate", (poll) => {
      setPoll((prevPoll) => {
        if (prevPoll.pollId === poll.pollId) {
          return poll;
        } else {
          return prevPoll;
        }
      });
    });

    const fetchPoll = async () => {
      try {
        const response = await getPoll(pollId);
        if (response.ok) {
          const data = await response.json();
          setPoll(data);
          setLoading(false);
        } else {
          setFound(false);
          setLoading(false);
        }
      } catch (e) {
        setFound(false);
        setLoading(false);
      }
    };
    fetchPoll();

    return () => {
      socket.off("pollUpdate");
    };
  }, [socket]);

  return (
    <>
      <div className={styles.pollDetailsContainer}>
        <h1 className={styles.title}>Polls Page</h1>
        {!found ? (
          <p>Poll not found</p>
        ) : loading ? (
          <div className={styles.loadingContainer}>
            <Loader />
            <p className={styles.emptyMessage}>Loading your poll</p>
          </div>
        ) : (
          <Poll
            pollId={poll.pollId}
            creator={poll.creator.username}
            avatar={poll.creator.avatar}
            question={poll.question}
            options={poll.options}
            selected={
              poll.selectedIndex !== undefined ? poll.selectedIndex : null
            }
            uploadDate={poll.date}
          />
        )}
      </div>
    </>
  );
};

export default PollDetails;
