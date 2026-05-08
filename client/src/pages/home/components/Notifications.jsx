import React, { useState, useEffect } from "react";
import styles from "./Feed/css/feed.module.css";
import { useSocket } from "../../../components/SocketProvider";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const handleFollowed = (data) => {
        setNotifications((prev) => [
          { text: `${data.username} started following you`, type: "follow", date: new Date() },
          ...prev,
        ]);
      };

      socket.on("followed", handleFollowed);
      return () => socket.off("followed", handleFollowed);
    }
  }, [socket]);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>Notifications</h1>
      {notifications.length === 0 ? (
        <p className={styles.emptyMessage}>No new notifications.</p>
      ) : (
        notifications.map((note, index) => (
          <div key={index} className={styles.notificationItem} style={{
            padding: "15px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            marginBottom: "10px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <p>{note.text}</p>
            <small style={{ opacity: 0.5 }}>{note.date.toLocaleTimeString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
