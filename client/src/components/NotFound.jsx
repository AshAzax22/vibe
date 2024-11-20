import React from "react";
import styles from "./css/notFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/home" className={styles.notFoundLink}>
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
