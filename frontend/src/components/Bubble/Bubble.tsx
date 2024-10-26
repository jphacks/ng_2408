import React from "react";
import { MessageInterface } from "@/types/interface";
import styles from "./Bubble.module.scss";

export default function Bubble({ bubble }: { bubble: MessageInterface }) {
  return (
    <p>
      <span className={styles.name}>{bubble.senderName}</span>
      <span className={styles.hash}>
        #{bubble.addressHash.slice(0, 4)}
      </span>: {bubble.message}
    </p>
  );
}
