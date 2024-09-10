import { useState } from "react";
import styles from "../css/navbar.module.css";
import NavItem from "./NavItem";
import homeIcon from "../images/home.svg";
import notificationIcon from "../images/notification.svg";
import addIcon from "../images/add.svg";
import settingsIcon from "../images/settings.svg";
import moreIcon from "../images/more.svg";
import logOutIcon from "../images/log out.svg";
import AvatarIcon from "../../../assets/avatars/Preview.png";
import closeIcon from "../images/close.svg";

const Navbar = () => {
  const [navState, setNavState] = useState(false);

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
          <NavItem
            icon={notificationIcon}
            itemName={"Notifications"}
            navState={navState}
          />
          <NavItem icon={addIcon} itemName={"Add a poll"} navState={navState} />
          <NavItem
            icon={settingsIcon}
            itemName={"Settings"}
            navState={navState}
          />
          <NavItem icon={AvatarIcon} itemName={"Profile"} navState={navState} />
        </section>
        <section>
          <NavItem icon={moreIcon} itemName={"More"} navState={navState} />
          <NavItem icon={logOutIcon} itemName={"Log Out"} navState={navState} />
        </section>
      </div>
    </>
  );
};
export default Navbar;
