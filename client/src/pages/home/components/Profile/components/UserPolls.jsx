import styles from "../css/userPolls.module.css";
import PollMini from "../../PollMini";

const UserPolls = ({ data, activeUser }) => {
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
              <PollMini key={index} data={poll} activeUser={activeUser} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserPolls;
