import { useState } from "react";
import styles from "../css/avatarMenu.module.css";
import avatars from "../../../assets/avatars";
import Avatar from "./Avatar";

const AvatarMenu = ({ setAvatar, selectedIndex, setIndex }) => {
  return (
    <>
      <div className={styles.avatarMenu}>
        {avatars.map((avatar, index) => (
          <Avatar
            key={index}
            selectedIndex={selectedIndex}
            setIndex={setIndex}
            index={index}
            setFunction={setAvatar}
            avatar={avatar}
            width="50px"
            height="50px"
          />
        ))}
      </div>
    </>
  );
};

export default AvatarMenu;
