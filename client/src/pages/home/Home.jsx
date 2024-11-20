import styles from "./css/home.module.css";
import Navbar from "./components/Navbar";
import Trending from "./components/Trending";

// import Notifications from "./components/Notifications";
// import Settings from "./components/Settings";

const Home = ({ children }) => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      {children}
      <Trending />
    </div>
  );
};

export default Home;
