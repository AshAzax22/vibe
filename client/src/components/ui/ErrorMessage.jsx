import React from "react";
import styles from "../../pages/signup/css/signUp.module.css";

const ErrorMessage = ({ message }) => (
  <p className={styles.info} style={{ color: "red" }}>
    {message}
  </p>
);

export default ErrorMessage;
