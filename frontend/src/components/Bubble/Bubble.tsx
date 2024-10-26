import React from "react";
import { messageDownEventInterface } from "@/types/interface";
import styles from "./Bubble.module.scss";

export default function Bubble({
  bubble,
}: {
  bubble: messageDownEventInterface;
}) {
  return (
    <p>
      <span className={styles.name}>{bubble.name}</span>
      <span className={styles.hash}>
        #{bubble.addressHash.slice(0, 4)}
      </span>: <span className={styles.message}>{bubble.message}</span>
    </p>
  );
}
