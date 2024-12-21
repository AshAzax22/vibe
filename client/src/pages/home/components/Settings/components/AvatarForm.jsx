import styles from "../css/avatarForm.module.css";
import avatars from "../../../../../assets/avatars";
import { useState } from "react";

const AvatarForm = ({ avatar, handleChange }) => {
  const [tab, setTab] = useState(false);
  return (
    <div className={styles.avatarFormContainer}>
      <div className={styles.title}>Avatar</div>
      <div className={styles.subContainer}>
        <div className={styles.avatarContainer}>
          <img src={avatars[avatar]} alt="avatar" className={styles.avatar} />

          <button onClick={() => setTab(!tab)}>
            {tab ? "Done" : "Change Avatar"}
          </button>
        </div>

        {tab && (
          <div className={styles.avatarForm}>
            <div className={styles.avatarsContainer}>
              {avatars.map((avatar, index) => (
                <img
                  src={avatar}
                  alt="avatar"
                  key={index}
                  className={styles.avatarOption}
                  onClick={() => handleChange("avatar", index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarForm;
