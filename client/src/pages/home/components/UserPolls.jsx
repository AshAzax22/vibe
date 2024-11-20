import styles from "../css/userPolls.module.css";
import TrendingPoll from "./TrendingPoll.jsx";

const UserPolls = ({ selectedTab, data }) => {
  const remove = selectedTab === "pollsCreated" ? true : false;
  return (
    <>
      <div className={styles.pollsCreatedContainer}>
        <div className={styles.subContainer}>
          {!data ? (
            <p>Loading polls...</p>
          ) : data.length === 0 ? (
            <p>No polls yet.</p>
          ) : (
            data.map((poll, index) => (
              <TrendingPoll key={index} data={poll} remove={remove} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserPolls;
