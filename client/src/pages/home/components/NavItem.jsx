import React from "react";
import styles from "../css/navItem.module.css";

const NavItem = ({ icon, itemName, navState }) => {
  return (
    <>
      <div
        className={styles.navItemContainer}
        style={{ gap: navState ? "24px" : "0px" }}
      >
        <img src={icon} alt={itemName} className={styles.icon} />
        <p
          className={styles.itemName}
          style={{
            width: navState ? "160px" : "0px",
          }}
        >
          {itemName}
        </p>
      </div>
    </>
  );
};

export default NavItem;
