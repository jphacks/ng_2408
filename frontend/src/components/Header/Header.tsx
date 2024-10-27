"use client";

import React from "react";
import styles from "./Header.module.scss";
import { ImExit } from "react-icons/im";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navigationContainer}>
        <nav className={styles.navigation}>
          <span className={styles.logo}>What&apos;s up!</span>
          <span className={styles.userNumber}>users</span>
          <div
            className={styles.logoutButton}
            onClick={() => window.location.reload()}
          >
            <ImExit />
          </div>
        </nav>
      </div>
    </header>
  );
}
