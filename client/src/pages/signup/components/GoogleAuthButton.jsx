import React from "react";
import googleLogo from "../images/google.svg";
import styles from "../css/signUp.module.css";

const GoogleAuthButton = ({ func }) => (
  <button className={styles.googleAuthContainer} onClick={func}>
    <img src={googleLogo} alt="google" />
    <p>Continue with Google</p>
  </button>
);

export default GoogleAuthButton;
