import React, { useState, useRef } from "react";
import styles from "./settings.module.css";
import { useUserData } from "../UserDataProvider";
import AvatarForm from "./components/AvatarForm";
import _ from "lodash";
import { updateUserProfile } from "../../api";
import PopUp from "../PopUp";

const Settings = () => {
  const currentData = useUserData();
  const [userData, setUserData] = useState(useUserData());
  const [error, setError] = useState(null);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (credential, value) => {
    setUserData({ ...userData, [credential]: value });
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    if (!userData.username || !userData.email) {
      setError("Please fill out all fields");
      setLoading(false);
      return;
    }
    try {
      const response = await updateUserProfile(userData);
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setError(null);
        setPopUpMessage("Changes saved successfully.");
        setIsSuccess(true);
        setShowPopUp(true);
        setTimeout(() => {
          setShowPopUp(false);
        }, 1500);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError({ e });
    }
  };

  return (
    <div className={styles.settingsContainer}>
      {showPopUp && <PopUp message={popUpMessage} isSuccess={isSuccess} />}
      <div className={styles.title}>Settings</div>
      <AvatarForm avatar={userData.avatar} handleChange={handleChange} />
      <div className={styles.inputContainer}>
        <div className={styles.username}>
          <p className={styles.title}>Username</p>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <p className={styles.info}>Tap to edit</p>
        </div>
        <div className={styles.email}>
          <h1 className={styles.title}>Email</h1>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <p className={styles.info}>Tap to edit</p>
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!_.isEqual(currentData, userData) && (
        <button
          className={styles.save}
          onClick={() => handleProfileUpdate()}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
};

export default Settings;
