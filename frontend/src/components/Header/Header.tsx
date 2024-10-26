import React from "react";
import styles from "./Header.module.scss";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navigationContainer}>
        <nav className={styles.navigation}>
          <div className={styles.logo}>ls-chat</div>
          <div className={styles.userNumber}>users</div>
          <button className={styles.logoutButton}>logout</button>
        </nav>
      </div>
    </header>
  );
}
