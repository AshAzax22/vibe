import styles from "../css/avatar.module.css";

const Avatar = ({
  selectedIndex,
  setIndex,
  index,
  tab = "avatarSelector",
  setFunction,
  avatar,
  width = "120px",
  height = "120px",
}) => {
  const handleClick = () => {
    if (tab != "avatarSelector") {
      setFunction("avatarSelector");
    } else {
      setFunction(avatar);
      setIndex(index);
    }
  };
  return (
    <div>
      <div
        className={styles.avatarContainer}
        style={{
          width: width,
          height: height,
          border:
            index == selectedIndex ? "2px solid blue" : "2px solid transparent",
        }}
      >
        <img
          src={avatar}
          alt="avatar"
          className={styles.avatar}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Avatar;
