import React, { useState } from "react";
import styles from "./css/navbar.module.css";
import NavItem from "./components/NavItem";
import homeIcon from "../../../../assets/images/home.svg";
import notificationIcon from "../../../../assets/images/notification.svg";
import addIcon from "../../../../assets/images/add.svg";
import settingsIcon from "../../../../assets/images/settings.svg";
import closeIcon from "../../../../assets/images/close.svg";
import saveIcon from "../../../../assets/images/save.svg";
import avatars from "../../../../assets/avatars";
import LogOut from "./components/LogOut";
import { useUserData } from "../UserDataProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userData = useUserData();
  const navigate = useNavigate();
  const [navState, setNavState] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };
  return (
    <>
      {/* Mobile/Tablet Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.brandName}>VIBE</div>
        <div className={styles.mobileSearchContainer}>
          <input
            type="text"
            placeholder="Search vibes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

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
        <div 
          className={styles.searchContainer} 
          style={{ display: navState ? "block" : "none" }}
        >
          <input
            type="text"
            placeholder="Search vibes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <section className={styles.mainNav}>
          <NavItem icon={homeIcon} itemName={"Home"} navState={navState} />
          <NavItem icon={addIcon} itemName={"Add a poll"} navState={navState} />
          <NavItem
            icon={notificationIcon}
            itemName={"Notifications"}
            navState={navState}
          />
          <NavItem icon={saveIcon} itemName={"Saved"} navState={navState} />

          <NavItem
            icon={avatars[userData.avatar]}
            itemName={userData.username}
            navState={navState}
            kind={"avatar"}
          />
        </section>
        <section className={styles.secondaryNav}>
          <NavItem
            icon={settingsIcon}
            itemName={"Settings"}
            navState={navState}
          />
          <div className={styles.logoutWrapper}>
            <LogOut navState={navState} />
          </div>
        </section>
      </div>
    </>
  );
};
export default Navbar;
