"use client"; // クライアントサイドで実行されることを明示する

import NestedModal from "@/components/Modal/NestedModal";
import { getCurrentPosition } from "@/utils/geolocation";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket;

export default function WebSocketPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [modalClosed, setModalClosed] = useState<boolean>(false);

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
        const location = await getCurrentPosition();
        const latitude = location?.coords.latitude;
        const longitude = location?.coords.longitude;
        socket.emit("init", { latitude, longitude }); // 'init' イベントで送信
        console.log(
          "Sent location data to server : " + { latitude, longitude }
        );
      } catch (err) {
        console.error(err);
      }
    });

    // 'message' イベントをリッスンして、メッセージを受信
    socket.on("message", (data: string) => {
      setMessage(data);
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
      <NestedModal setModalClosed={setModalClosed} />
      <h1>WebSocket Client</h1>
      <div>
        <label>Received Message: </label>
        <span>{message ? message : "No message yet"}</span>
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
