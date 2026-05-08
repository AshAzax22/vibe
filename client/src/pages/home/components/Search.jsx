import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Feed/css/feed.module.css";
import Loader from "../../../components/ui/Loader";
import Poll from "./Poll";
import UserMini from "./UserMini";
import { searchPolls, searchUsers } from "../../../api";

const Search = () => {
  const [polls, setPolls] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      Promise.all([searchPolls(query), searchUsers(query)]).then(([pRes, uRes]) => {
        if (pRes && pRes.ok) pRes.json().then(setPolls);
        if (uRes && uRes.ok) uRes.json().then(setUsers);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>Search Results for "{query}"</h1>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <h2 className={styles.subtitle} style={{ color: "white", marginBottom: "20px" }}>Users</h2>
          {users.length === 0 ? <p>No users found.</p> : users.map((user, index) => (
            <UserMini key={index} username={user.username} followCount={user.followCount} avatar={user.avatar} />
          ))}

          <h2 className={styles.subtitle} style={{ color: "white", margin: "40px 0 20px" }}>Polls</h2>
          {polls.length === 0 ? <p>No polls found.</p> : polls.map((poll, index) => (
            <Poll
              key={index}
              pollId={poll.pollId}
              creator={poll.creator.username}
              avatar={poll.creator.avatar}
              question={poll.question}
              options={poll.options}
              selected={poll.selectedIndex !== undefined ? poll.selectedIndex : null}
              uploadDate={poll.date}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Search;
