import React from "react";
import styles from "../../pages/signup/css/signUp.module.css";

const SubmitButton = ({ loading, onClick }) => (
  <button className={styles.letsGo} disabled={loading} onClick={onClick}>
    {loading ? "Loading.." : "Let's go"}
  </button>
);

export default SubmitButton;
