import styles from "./css/userOnboarding.module.css";
import MasonryGrid from "../../components/MasonryGrid";
import Avatar from "./components/Avatar";
import UsernameInput from "./components/UsernameInput";
import Tips from "./components/Tips";
import defaultAvatar from "../../assets/avatars/Preview.png";
import AvatarMenu from "./components/AvatarMenu";
import { useAuth } from "../../components/AuthProvider";
import { searchUser, setUserProfile } from "./api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserOnboarding = () => {
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState("username");
  const [alert, setAlert] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [selectedIndex, setIndex] = useState(0);
  const onChange = (e) => {
    setUsername(e.target.value);
  };
  const navigate = useNavigate();

  const { isAuthorized } = useAuth();

  const handleSubmit = async () => {
    if (username === "") {
      return setAlert("Username cannot be empty");
    }
    if (username.length < 6) {
      return setAlert("Username must be at least 6 characters long");
    }
    let response = await searchUser(username);
    if (response.ok) {
      if (!isAuthorized) {
        console.log("unauthorized access");
      }
      let response = await setUserProfile(username, selectedIndex);
      if (response.ok) {
        navigate("/home");
      } else {
        let data = await response.json();
        setAlert(data.message);
      }
    } else {
      let data = await response.json();
      setAlert(data.message);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.masonaryContainer}>
          <MasonryGrid />
        </div>
        <div className={styles.backdrop}></div>
        <div className={styles.overlay}>
          <p className={styles.title}>Complete Profile</p>
          <Avatar tab={tab} setFunction={setTab} avatar={avatar} />
          {tab === "username" ? (
            <>
              <UsernameInput value={username} onChange={onChange}>
                {alert != "" ? <p className={styles.alert}>{alert}</p> : <></>}
              </UsernameInput>
              <button
                className={styles.progressiveButton}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <Tips />
            </>
          ) : (
            <>
              <AvatarMenu
                selectedIndex={selectedIndex}
                setIndex={setIndex}
                setAvatar={setAvatar}
              />
              <button
                className={styles.progressiveButton}
                onClick={() => setTab("username")}
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOnboarding;
