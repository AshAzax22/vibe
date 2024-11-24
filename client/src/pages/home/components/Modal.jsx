// Modal.jsx
import React from "react";
import styles from "../css/modal.module.css";

const Modal = ({
  title,
  description,
  negative,
  positive,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            {negative}
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            {positive}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
