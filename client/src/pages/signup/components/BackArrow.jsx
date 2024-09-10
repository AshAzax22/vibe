import React from "react";
import styles from "../css/signUp.module.css";

const BackArrow = ({ onClick }) => (
  <svg
    className={styles.backArrow}
    width="25"
    height="15"
    viewBox="0 0 25 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M24.7005 8.21977C25.091 7.82925 25.091 7.19608 24.7005 6.80556L18.3366 0.441597C17.946 0.0510727 17.3129 0.0510727 16.9223 0.441597C16.5318 0.832121 16.5318 1.46529 16.9223 1.85581L22.5792 7.51266L16.9223 13.1695C16.5318 13.56 16.5318 14.1932 16.9223 14.5837C17.3129 14.9743 17.946 14.9743 18.3366 14.5837L24.7005 8.21977ZM-0.0065918 8.51266H23.9934V6.51266H-0.0065918L-0.0065918 8.51266Z"
      fill="white"
    />
  </svg>
);

export default BackArrow;
