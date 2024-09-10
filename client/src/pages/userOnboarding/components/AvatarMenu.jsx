import { useState } from "react";
import styles from "../css/avatarMenu.module.css";
import avatar1 from "../../../assets/avatars/Preview.png";
import avatar2 from "../../../assets/avatars/Preview-1.png";
import avatar3 from "../../../assets/avatars/Preview-2.png";
import avatar4 from "../../../assets/avatars/Preview-3.png";
import avatar5 from "../../../assets/avatars/Preview-4.png";
import avatar6 from "../../../assets/avatars/Preview-5.png";
import avatar7 from "../../../assets/avatars/Preview-6.png";
import avatar8 from "../../../assets/avatars/Preview-7.png";
import avatar9 from "../../../assets/avatars/Preview-8.png";
import avatar10 from "../../../assets/avatars/Preview-9.png";
import Avatar from "./Avatar";

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

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
