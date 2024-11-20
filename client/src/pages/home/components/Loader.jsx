import React from "react";
import styles from "../css/loader.module.css";
const Loader = () => {
  return (
    <div className={styles.dotWave}>
      <div className={styles.dotWaveDot}></div>
      <div className={styles.dotWaveDot}></div>
      <div className={styles.dotWaveDot}></div>
      <div className={styles.dotWaveDot}></div>
    </div>
  );
};
export default Loader;
