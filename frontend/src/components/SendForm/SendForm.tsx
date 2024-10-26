"use client";

import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styles from "./SendForm.module.scss";

interface SendFormProps {
  socket: Socket;
}

export default function SendForm({ socket }: SendFormProps) {
  const [input, setInput] = useState<string>("");

  // サーバーにメッセージを送信する関数
  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.emit("message", input); // 'message' イベントで送信
      setInput("");
    }
  };

  return (
    <div className={styles.sendForm}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(); // Enterキーが押されたときにメッセージを送信
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
