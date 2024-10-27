import React from "react";
import { messageDownEventInterface } from "@/types/interface";
import styles from "./Bubble.module.scss";

export default function Bubble({
  bubble,
}: {
  bubble: messageDownEventInterface;
}) {
  return (
    <div className={styles.bubbleContainer}>
      {bubble.isSelfMessage ? (
        <>
          <div className={styles.userData} style={{ textAlign: "right" }}>
            <span className={styles.name}>{bubble.name}</span>
            <span className={styles.hash}>
              #{bubble.addressHash.slice(0, 4)}
            </span>
          </div>
          <div className={styles.bubble}>
            <div className={styles.chat}>
              <div className={styles.myMessage}>
                <p>{bubble.message}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.userData} style={{ textAlign: "left" }}>
            <span className={styles.name}>{bubble.name}</span>
            <span className={styles.hash}>
              #{bubble.addressHash.slice(0, 4)}
            </span>
          </div>
          <div className={styles.bubble}>
            <div className={styles.chat}>
              <div className={styles.message}>
                <p>{bubble.message}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
