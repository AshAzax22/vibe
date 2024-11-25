import { useState, useEffect } from "react";
import styles from "../css/followData.module.css";
import UserMini from "../../UserMini";
import { getUserData } from "../../../api";
import Loader from "../../Loader";

const FollowData = ({ usernames, title }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        if (!usernames || usernames.length === 0) {
          setUsers([]);
          setLoading(false);
          return;
        }

        const userDataPromises = usernames.map((username) =>
          getUserData(username)
        );
        const usersData = await Promise.all(userDataPromises);

        const resolvedData = await Promise.all(
          usersData.map((data) => data.json())
        );

        setUsers(resolvedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [usernames]);

  return (
    <>
      <div className={styles.followDataContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.usersContainer}>
          {loading ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : users.length == 0 ? (
            <p className={styles.noUsers}>No {title.toLowerCase()} to show</p>
          ) : (
            users.map((user) => (
              <UserMini
                key={user._id}
                username={user.username}
                followCount={user.followers.length}
                avatar={user.avatar}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FollowData;
