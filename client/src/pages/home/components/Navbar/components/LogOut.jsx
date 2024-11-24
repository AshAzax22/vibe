import React from "react";
import styles from "../css/navItem.module.css";
import { useState } from "react";
import Modal from "../../Modal";
import icon from "../../../images/log out.svg";
import { useNavigate } from "react-router-dom";

const LogOut = ({ navState }) => {
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const closeModal = () => {
    setIsModelOpen(false);
  };
  const openModal = () => {
    setIsModelOpen(true);
  };
  const confirmLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("email");
    navigate("/");
  };

  const handleLogOut = () => {
    openModal();
  };

  return (
    <>
      <div
        className={styles.navItemContainer}
        style={{ gap: navState ? "24px" : "0px" }}
        onClick={() => handleLogOut()}
      >
        <img src={icon} alt="log out" className={styles.icon} />
        <p
          className={styles.itemName}
          style={{
            width: navState ? "160px" : "0px",
            opacity: navState ? "1" : "0",
          }}
        >
          Log Out
        </p>
      </div>

      <Modal
        title="Confirm Log Out"
        description="Are you sure you want to log out?"
        negative="Cancel"
        positive="Log Out"
        isOpen={isModelOpen}
        onClose={closeModal}
        onConfirm={confirmLogOut}
      />
    </>
  );
};

export default LogOut;
