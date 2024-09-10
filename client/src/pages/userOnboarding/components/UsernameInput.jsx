import React from "react";
import styles from "../css/usernameInput.module.css";

const UsernameInput = ({ value, onChange, children }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Username"
        />
        {children}
      </div>
    </>
  );
};

export default UsernameInput;
