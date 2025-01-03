import React, { useState } from "react";
import styles from "./css/navbar.module.css";
import NavItem from "./components/NavItem";
import homeIcon from "../../images/home.svg";
import notificationIcon from "../../images/notification.svg";
import addIcon from "../../images/add.svg";
import settingsIcon from "../../images/settings.svg";
import closeIcon from "../../images/close.svg";
import avatars from "../../../../assets/avatars";
import LogOut from "./components/LogOut";
import { useUserData } from "../UserDataProvider";

const Navbar = () => {
  const userData = useUserData();

  const [navState, setNavState] = useState(true);
  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.navHead} onClick={() => setNavState(!navState)}>
          <div className={styles.brandName}>VIBE</div>
          <img
            src={closeIcon}
            alt="close"
            className={styles.icon}
            style={{
              width: navState ? "24px" : "0px",
              height: navState ? "24px" : "0px",
            }}
          />
        </div>
        <section>
          <NavItem icon={homeIcon} itemName={"Home"} navState={navState} />
          <NavItem icon={addIcon} itemName={"Add a poll"} navState={navState} />
          <NavItem
            icon={notificationIcon}
            itemName={"Notifications"}
            navState={navState}
          />

          <NavItem
            icon={avatars[userData.avatar]}
            itemName={userData.username}
            navState={navState}
            kind={"avatar"}
          />
        </section>
        <section>
          <NavItem
            icon={settingsIcon}
            itemName={"Settings"}
            navState={navState}
          />
          <LogOut navState={navState} />
        </section>
      </div>
    </>
  );
};
export default Navbar;
