import { useEffect } from "react";
import styles from "./css/landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  useEffect(() => {
    if (localStorage.getItem("email")) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className={styles.body}>
      <p className={styles.brandName}>VIBE</p>
      <p className={styles.brief}>
        Join the buzz, set the trends, and see where you stand. VIBE is your
        go-to platform for making choices, sharing ideas, and getting rated by
        your peers. Create, vote, and rise in the ranks—your voice shapes the
        vibe.
      </p>
      <Link to={"/signup"}>
        <button className={styles.getStarted}>Get Started</button>
      </Link>
      <div className={styles.animatedTextContainer}>
        <p className={styles.animatedText}></p>
      </div>
    </div>
  );
};

export default Landing;
