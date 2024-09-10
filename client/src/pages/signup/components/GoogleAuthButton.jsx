import React from "react";
import googleLogo from "../images/google.svg";
import styles from "../css/signUp.module.css";

const GoogleAuthButton = () => (
  <button className={styles.googleAuthContainer}>
    <img src={googleLogo} alt="google" />
    <p>Sign in with Google</p>
  </button>
);

export default GoogleAuthButton;
