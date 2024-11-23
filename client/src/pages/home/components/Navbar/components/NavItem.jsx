import { useState, useEffect } from "react";
import styles from "../css/navItem.module.css";
import { useNavigate } from "react-router-dom";

const NavItem = ({ icon, itemName, navState, kind }) => {
  const navigate = useNavigate();
  const [navTo, setNavTo] = useState(null);
  useEffect(() => {
    itemName === "Home"
      ? setNavTo("/home")
      : itemName === "Add a poll"
      ? setNavTo("/add-a-poll")
      : itemName === "Notifications"
      ? setNavTo("/notifications")
      : itemName === "Settings"
      ? setNavTo("/settings")
      : setNavTo(`/profile/${itemName}`);
  });

  return (
    <>
      <div
        className={styles.navItemContainer}
        style={{ gap: navState ? "24px" : "0px" }}
        onClick={() => navigate(navTo)}
      >
        <img
          src={icon}
          alt={itemName}
          className={styles.icon}
          style={{
            borderRadius: "50%",
            backgroundColor: kind ? "white" : "none",
          }}
        />
        <p
          className={styles.itemName}
          style={{
            width: navState ? "160px" : "0px",
            opacity: navState ? "1" : "0",
          }}
        >
          {itemName}
        </p>
      </div>
    </>
  );
};

export default NavItem;
