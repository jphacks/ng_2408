"use client"; // クライアントサイドで実行されることを明示する

import { getCurrentPosition } from "@/utils/geolocation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function WebSocketPage() {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // 本番環境と開発環境で WebSocket サーバーの URL を変更する
    if (process.env.NODE_ENV === "production") {
      socket = io();
    } else {
      socket = io("ws://localhost:5000");
    }

    // 接続されたときにサーバーからメッセージを受信する
    socket.on("connect", async () => {
      console.log("Connected to WebSocket server");

      try {
        const currentPosition = await getCurrentPosition();
        const latitude = currentPosition?.coords.latitude;
        const longitude = currentPosition?.coords.longitude;

        if (!latitude || !longitude) {
          throw new Error("Failed to get location data");
        }

        const name = "noname";
        const position = { latitude, longitude };
        socket.emit("init", { name, position }); // 'init' イベントで送信
        console.log(
          "Sent location data to server : " + { latitude, longitude }
        );
      } catch (err) {
        console.error(err);
      }
    });

    // 'message' イベントをリッスンして、メッセージを受信
    socket.on("message", (data: string) => {
      setMessageList((prev) => [...prev, data]);
    });

    // クリーンアップ時にソケットを切断
    return () => {
      socket.disconnect();
    };
  }, []);

  // サーバーにメッセージを送信する関数
  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.emit("message", input); // 'message' イベントで送信
      setInput("");
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <div>
        <label>Received Message: </label>
        {messageList.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div>
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
    </div>
  );
}
