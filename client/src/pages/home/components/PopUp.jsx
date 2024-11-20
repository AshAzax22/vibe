import styles from "../css/popup.module.css";

const PopUp = ({ message, isSuccess }) => {
  return (
    <div
      className={`${styles.popup} ${
        isSuccess ? styles.success : styles.failure
      }`}
    >
      {message}
    </div>
  );
};

export default PopUp;
