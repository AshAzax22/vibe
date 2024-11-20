import { useState, useEffect } from "react";
import SwitchNav from "./SwitchNav";
import styles from "../css/pollActivity.module.css";
import UserPolls from "./UserPolls";
const PollActivity = ({ pollsCreated, pollsVoted }) => {
  const [selectedTab, setSelectedTab] = useState("pollsCreated");
  const [data, setData] = useState(pollsCreated);

  useEffect(() => {
    selectedTab === "pollsCreated"
      ? setData(pollsCreated)
      : setData(pollsVoted);
  }, [selectedTab, pollsCreated, pollsVoted]);

  return (
    <>
      <div className={styles.userPollsContainer}>
        <SwitchNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <hr />
        <UserPolls selectedTab={selectedTab} data={data} />
      </div>
    </>
  );
};

export default PollActivity;
