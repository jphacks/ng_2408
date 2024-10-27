import React from "react";
import styles from "./Header.module.scss";
import { ImExit } from "react-icons/im";
import UserList from "./UserList/UserList";
import { updateEventInterface } from "@/types/interface";

interface HeaderProps {
  users: updateEventInterface[];
}

export default function Header({ users }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.navigationContainer}>
        <nav className={styles.navigation}>
          <span className={styles.logo}>What&apos;s up!</span>
          <UserList users={users} />
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
