"use client";

import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styles from "./SendForm.module.scss";
import { IoIosSend } from "react-icons/io";
import TextField from "@mui/material/TextField"; // TextFieldをインポート

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
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: "5px" }}
        placeholder="メッセージを入力"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(); // Enterキーが押されたときにメッセージを送信
          }
        }}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <div
        onClick={sendMessage}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zoom: 1.8,
          marginTop: "5px",
        }}
      >
        <IoIosSend />
      </div>
    </div>
  );
}
